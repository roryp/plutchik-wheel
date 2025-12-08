using './main.bicep'

param environmentName = readEnvironmentVariable('AZURE_ENV_NAME', 'plutchik-dev')
param location = readEnvironmentVariable('AZURE_LOCATION', 'eastus')
