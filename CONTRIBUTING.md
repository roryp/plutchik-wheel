# Contributing to Plutchik Wheel Explorer

Thank you for your interest in contributing to the Plutchik Wheel Explorer! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## How to Contribute

### Reporting Issues

- Check existing issues before creating a new one
- Use the issue templates when available
- Provide clear reproduction steps for bugs
- Include browser/OS information for UI issues

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting: `npm run lint`
5. Run build: `npm run build`
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/plutchik-wheel.git
cd plutchik-wheel

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Code Style

- TypeScript strict mode
- Functional React components with hooks
- Tailwind CSS for styling
- Use `cn()` helper for conditional classes
- Follow existing patterns in the codebase

### Commit Messages

- Use clear, descriptive commit messages
- Format: `[component] Brief description`
- Example: `[PlutchikWheel] Add keyboard navigation support`

## Legal

Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.
