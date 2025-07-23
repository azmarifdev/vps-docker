# PickOne Application Docker Setup

This repository contains the complete Docker setup for the PickOne application with three services:

-   **Client** (Next.js) - Port 3000
-   **Admin** (Next.js) - Port 3001
-   **Server** (Node.js/Express) - Port 5000
-   **MongoDB** - Port 27017

## Prerequisites

-   Docker
-   Docker Compose
-   VPS with required ports open (3000, 3001, 5000, 27017)

## Quick Deployment

### 1. Upload files to VPS

```bash
# Upload the entire project to your VPS
scp -r . root@103.213.38.213:/var/www/pickone/
```

### 2. Connect to VPS and deploy

```bash
# Connect to VPS
ssh root@103.213.38.213

# Navigate to project directory
cd /var/www/pickone/

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## Manual Deployment

```bash
# Stop existing containers
docker-compose down

# Build and start all services
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## Service URLs

After deployment, your services will be available at:

-   **Client**: http://103.213.38.213:3000
-   **Admin**: http://103.213.38.213:3001
-   **Server API**: http://103.213.38.213:5000
-   **MongoDB**: 103.213.38.213:27017

## Environment Variables

Make sure you have the following environment variables in `pickone-server/.env`:

```env
MONGO_INITDB_ROOT_USERNAME=your_username
MONGO_INITDB_ROOT_PASSWORD=your_password
MONGO_INITDB_DATABASE=pickone
```

## Useful Commands

```bash
# View all containers
docker ps

# View logs for specific service
docker-compose logs client
docker-compose logs admin
docker-compose logs server

# Restart specific service
docker-compose restart client

# Stop all services
docker-compose down

# Remove all containers and images
docker system prune -a
```

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000, 3001, 5000, 27017 are not used by other services
2. **Build failures**: Check Dockerfile and package.json files
3. **Service communication**: All services are in the same Docker network (app-network)
4. **Database connection**: Make sure MongoDB environment variables are properly set

## File Structure

```
.
├── docker-compose.yml          # Main compose file
├── nginx.conf                  # Nginx configuration
├── deploy.sh                   # Deployment script
├── pickone-client/
│   ├── Dockerfile
│   └── .dockerignore
├── pickone-admin/
│   ├── Dockerfile
│   └── .dockerignore
└── pickone-server/
    ├── Dockerfile
    ├── docker-compose.yml      # Original server compose
    └── .env
```
