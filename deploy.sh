#!/bin/bash

# Deploy script for PickOne application

echo "Starting deployment..."

# Stop existing containers
echo "Stopping existing containers..."
docker-compose down

# Remove old images (optional)
echo "Removing old images..."
docker system prune -f

# Build and start all services
echo "Building and starting all services..."
docker-compose up -d --build

# Wait for services to start
echo "Waiting for services to start..."
sleep 30

# Check service status
echo "Checking service status..."
docker-compose ps

# Show logs
echo "Showing recent logs..."
docker-compose logs --tail=20

echo "Deployment completed!"
echo ""
echo "Services are now available at:"
echo "Client:  http://103.213.38.213:3000"
echo "Admin:   http://103.213.38.213:3001"
echo "Server:  http://103.213.38.213:5000"
echo "MongoDB: 103.213.38.213:27017"
