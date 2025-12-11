targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment that can be used as part of naming resource convention')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Name of the container app (auto-generated if not provided)')
param containerAppName string = ''

@description('Name of the container registry (auto-generated if not provided)')
param containerRegistryName string = ''

@description('Name of the Log Analytics workspace (auto-generated if not provided)')
param logAnalyticsName string = ''

@description('Name of the Container Apps environment (auto-generated if not provided)')
param containerAppsEnvironmentName string = ''

@description('Container image to deploy (leave empty for initial deployment)')
param containerImage string = ''

// Tags that should be applied to all resources
var tags = {
  'azd-env-name': environmentName
}

// Generate resource names
var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))

var effectiveContainerAppName = !empty(containerAppName) ? containerAppName : '${abbrs.appContainerApps}${resourceToken}'
var effectiveContainerRegistryName = !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
var effectiveLogAnalyticsName = !empty(logAnalyticsName) ? logAnalyticsName : '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
var effectiveContainerAppsEnvironmentName = !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'

// Resource group
resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-${environmentName}'
  location: location
  tags: tags
}

// Log Analytics workspace for Container Apps
module logAnalytics 'br/public:avm/res/operational-insights/workspace:0.11.1' = {
  name: 'logAnalytics'
  scope: rg
  params: {
    name: effectiveLogAnalyticsName
    location: location
    tags: tags
  }
}

// Container Registry
module containerRegistry 'br/public:avm/res/container-registry/registry:0.9.0' = {
  name: 'containerRegistry'
  scope: rg
  params: {
    name: effectiveContainerRegistryName
    location: location
    tags: tags
    acrSku: 'Basic'
    acrAdminUserEnabled: true
  }
}

// Container Apps Environment
module containerAppsEnvironment 'br/public:avm/res/app/managed-environment:0.10.1' = {
  name: 'containerAppsEnvironment'
  scope: rg
  params: {
    name: effectiveContainerAppsEnvironmentName
    location: location
    tags: tags
    logAnalyticsWorkspaceResourceId: logAnalytics.outputs.resourceId
    zoneRedundant: false
    publicNetworkAccess: 'Enabled'
  }
}

// User-assigned identity for Container App (created first to assign ACR role)
module containerAppIdentity 'br/public:avm/res/managed-identity/user-assigned-identity:0.4.1' = {
  name: 'containerAppIdentity'
  scope: rg
  params: {
    name: 'id-${effectiveContainerAppName}'
    location: location
    tags: tags
  }
}

// Role assignment for Container App identity to pull from ACR
module containerAppAcrPull 'br/public:avm/ptn/authorization/resource-role-assignment:0.1.1' = {
  name: 'containerAppAcrPull'
  scope: rg
  params: {
    principalId: containerAppIdentity.outputs.principalId
    resourceId: containerRegistry.outputs.resourceId
    roleDefinitionId: '7f951dda-4ed3-4680-a7ca-43fe172d538d' // AcrPull
  }
}

// Container App
module containerApp 'br/public:avm/res/app/container-app:0.14.0' = {
  name: 'containerApp'
  scope: rg
  params: {
    name: effectiveContainerAppName
    location: location
    tags: union(tags, { 'azd-service-name': 'web' })
    environmentResourceId: containerAppsEnvironment.outputs.resourceId
    containers: [
      {
        name: 'main'
        image: !empty(containerImage) ? containerImage : 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
        resources: {
          cpu: json('0.25')
          memory: '0.5Gi'
        }
      }
    ]
    registries: [
      {
        server: containerRegistry.outputs.loginServer
        identity: containerAppIdentity.outputs.resourceId
      }
    ]
    managedIdentities: {
      userAssignedResourceIds: [
        containerAppIdentity.outputs.resourceId
      ]
    }
    ingressTargetPort: 80
    ingressExternal: true
    scaleSettings: {
      minReplicas: 1
      maxReplicas: 3
    }
  }
  dependsOn: [
    containerAppAcrPull
  ]
}

// Outputs for azd
output AZURE_LOCATION string = location
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerRegistry.outputs.loginServer
output AZURE_CONTAINER_REGISTRY_NAME string = containerRegistry.outputs.name
output AZURE_CONTAINER_APPS_ENVIRONMENT_NAME string = containerAppsEnvironment.outputs.name
output AZURE_CONTAINER_APPS_ENVIRONMENT_ID string = containerAppsEnvironment.outputs.resourceId
output SERVICE_WEB_NAME string = containerApp.outputs.name
output SERVICE_WEB_URI string = 'https://${containerApp.outputs.fqdn}'
