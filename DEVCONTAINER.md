# 🐳 DevContainer Setup - Plutchik Wheel Explorer

This project includes a fully configured DevContainer for instant, consistent development environments.

## 🚀 Quick Start (GitHub Copilot Agent Mode)

### Option 1: GitHub Codespaces (Easiest)
1. Click **Code** → **Codespaces** → **Create codespace on main**
2. Wait for the container to build (~2-3 minutes first time)
3. Copilot will automatically have access - just ask:
   > "Run the dev server"

### Option 2: VS Code + Docker Desktop
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Install [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open VS Code, press `F1` → **Dev Containers: Reopen in Container**
4. Wait for build, then ask Copilot:
   > "Start the HTTP server"

---

## 🤖 GitHub Copilot Agent Mode Commands

Once inside the container, you can use natural language with Copilot:

| What you say | What happens |
|-------------|--------------|
| "Run the dev server" | Starts Vite at http://localhost:5173 |
| "Build for production" | Creates optimized build in `dist/` |
| "Preview the production build" | Serves build at http://localhost:4173 |
| "Install dependencies" | Runs `npm install` |
| "Run linting" | Checks code quality |

---

## 📦 What's Included

### Development Tools
- **Node.js 20** (LTS) with npm
- **TypeScript** latest
- **GitHub CLI** for repo operations
- **Azure CLI** for cloud deployments

### VS Code Extensions (Auto-installed)
- GitHub Copilot & Copilot Chat
- TypeScript support
- Tailwind CSS IntelliSense
- ESLint & Prettier
- Docker tools
- Azure Container Apps

### Ports Exposed
| Port | Service | Auto-action |
|------|---------|-------------|
| 5173 | Vite Dev Server | Opens browser |
| 4173 | Vite Preview | Notification |
| 80 | Nginx (production) | Notification |

---

## 🎯 Demo Script for Presentation

### 1. Show "Zero to Running" in Agent Mode

```
Step 1: Open repo in Codespace or DevContainer
Step 2: Ask Copilot: "Run the dev server"
Step 3: Browser opens automatically to the Plutchik Wheel!
```

### 2. Show Production Build + Preview

```
Ask Copilot: "Build for production and preview it"
→ Copilot runs npm run build, then npm run preview
→ Opens http://localhost:4173
```

### 3. Show Docker Production Build

```
Ask Copilot: "Build the Docker image and run it"
→ docker build -t plutchik-wheel .
→ docker run -p 8080:80 plutchik-wheel
→ Opens http://localhost:8080
```

---

## 🔧 Manual Commands Reference

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Docker Production
docker build -t plutchik-wheel .
docker run -p 8080:80 plutchik-wheel

# Azure Deployment
azd up               # Deploy to Azure Container Apps
```

---

## 🎨 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI + shadcn/ui components
- **Visualization**: D3.js + Framer Motion
- **Deployment**: Azure Container Apps (via azd)
