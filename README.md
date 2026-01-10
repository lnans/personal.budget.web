<p align="center">
    <img src="./doc/logo.png" />
</p>

# Budget. Web

**Budget.** is a personal finance management web application designed to organize and track spending and savings over time. This repository contains the frontend implementation built with modern React technologies, following **Clean Architecture** principles.

## Technology Stack

- **React 19** - Latest React framework
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7** - Next generation frontend tooling
- **React Router 7** - Client-side routing
- **TanStack Query 5** - Data fetching and state management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **i18next** - Internationalization framework
- **Sonner** - Toast notifications
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── api/              # API client and query configuration
├── app/              # Application pages
├── components/       # Reusable UI components
│   ├── forms/       # Form components
│   └── ui/          # UI primitives
├── config/          # Configuration files
├── features/        # Feature modules
│   └── {feature}/   # Feature-specific components and stores
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── providers/       # React context providers
└── types/           # TypeScript type definitions
    └── {domain}/    # Domain-specific types
        ├── enums/   # Enum definitions
        ├── forms/   # Form DTOs
        └── responses/ # Response DTOs
```

### Layers

- **api**: Contains API client configuration, endpoints, and query keys. Handles all backend communication.
- **app**: Contains top-level page components and routing structure.
- **components**: Reusable UI components organized by purpose (forms, ui primitives).
- **features**: Feature modules containing feature-specific components, stores, and logic.
- **types**: Type definitions organized by domain, following strict type management rules.
- **lib**: Utility functions and library configurations.
- **providers**: React context providers for global state and configuration.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Yarn](https://yarnpkg.com/) (v4.12.0 or later)
- [Docker](https://www.docker.com/products/docker-desktop/) for containerization

## Run the project

This project uses Docker Compose to run the project. To run the project, you need to have Docker Compose installed.

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f web

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

- Web Application: http://localhost:8081

## Development

To run the web application in development mode:

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

The development server will start at http://localhost:5173 (or the next available port).

## Running with Backend

The web application requires the backend API to be running. To run the full application:

1. **Start the backend API**: Follow the instructions in the [backend README](https://github.com/lnans/personal.budget) to start
2. **Configure the API URL**: Create a `.env` file in the root of the project (or set environment variables) with:

   ```bash
   VITE_API_URL=http://localhost:8080
   ```

3. **Start the web application**: Run the development server as described in the [Development](#development) section.

## Code Formatting

Format the codebase:

```bash
yarn format
```

This script uses Prettier to format all files in the project.

## License

This project is licensed under the MIT License - see the [LICENSE](../personal.budget/LICENSE) file for details.
