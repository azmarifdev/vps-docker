#!/bin/bash

# Simple VPS deployment script
# Usage: ./vps-deploy.sh

VPS_IP="103.213.38.213"
VPS_USER="root"
VPS_PATH="/var/www/pickone"

echo "Deploying to VPS $VPS_IP..."

# Create directory on VPS
ssh $VPS_USER@$VPS_IP "mkdir -p $VPS_PATH"

# Copy files to VPS
echo "Copying files to VPS..."
scp -r . $VPS_USER@$VPS_IP:$VPS_PATH/

# Run deployment on VPS
echo "Running deployment on VPS..."
ssh $VPS_USER@$VPS_IP "cd $VPS_PATH && chmod +x deploy.sh && ./deploy.sh"

echo "Deployment completed!"
echo ""
echo "Your services are now available at:"
echo "Client:  http://$VPS_IP:3000"
echo "Admin:   http://$VPS_IP:3001"
echo "Server:  http://$VPS_IP:5000"
