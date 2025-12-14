# Development container for Plutchik Wheel Explorer
# Optimized for Vite + React + TypeScript development

FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm

# Install additional tools for development
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        curl \
        git \
        zsh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages for development convenience
RUN npm install -g npm@latest

# Set working directory
WORKDIR /workspaces/plutchik-wheel-explo

# Expose Vite dev server port (default: 5173)
EXPOSE 5173

# Expose Vite preview port
EXPOSE 4173

# Default command keeps container running for development
CMD ["sleep", "infinity"]
