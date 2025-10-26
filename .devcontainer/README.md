# Development Container Configuration

This directory contains the development container configuration for the Skill Swap project.

## Structure

- **devcontainer.json**: Main configuration file for VS Code Dev Containers
- **docker-compose.yml**: Multi-container setup with app and PostgreSQL database
- **Dockerfile**: Custom Node.js development image
- **init-db.sh**: PostgreSQL initialization script
- **scripts/**: Setup and lifecycle scripts
  - **post-create.sh**: Runs after container creation (dependency installation, migrations)
  - **post-start.sh**: Runs on container start (health checks)

## Services

### App Service
- Node.js 20 (Bookworm)
- Workspace mounted at `/workspace`
- Auto-installs dependencies on creation
- Runs Prisma migrations automatically

### Database Service
- PostgreSQL 16 Alpine
- Accessible at `db:5432`
- Credentials: `postgres/postgres`
- Database: `skillswap`
- Persistent volume for data

## Features

- **Pre-configured Extensions**: ESLint, Prettier, Tailwind CSS IntelliSense, Prisma
- **Format on Save**: Automatic code formatting
- **Database Tools**: Prisma Studio, PostgreSQL client
- **Git & GitHub CLI**: Pre-installed and configured
- **Zsh with Oh My Zsh**: Enhanced terminal experience

## Usage

1. Open project in VS Code
2. Click "Reopen in Container" when prompted
3. Wait for container build and setup
4. Run `npm run dev` to start the development server
5. Access app at http://localhost:3000

## Environment Variables

Automatically generated `.env` file includes:
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Development mode
- `NEXTAUTH_SECRET`: Auto-generated secure secret
- `NEXTAUTH_URL`: Local development URL

## Database Management

```bash
npx prisma studio
npx prisma migrate dev
npx prisma db push
npx prisma db seed
```

## Ports

- **3000**: Next.js development server
- **5432**: PostgreSQL database

## Volume Management

Named volumes persist data:
- `postgres-data`: Database files
- `node_modules`: Dependencies (improves performance)
