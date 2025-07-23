#!/bin/bash

# Test script for deployed services

VPS_IP="103.213.38.213"

echo "Testing deployed services on $VPS_IP..."
echo "========================================="

# Test Client (Port 3000)
echo -n "Testing Client (Port 3000): "
if curl -s http://$VPS_IP:3000 > /dev/null; then
    echo "✓ Client is running"
else
    echo "✗ Client is not responding"
fi

# Test Admin (Port 3001)
echo -n "Testing Admin (Port 3001): "
if curl -s http://$VPS_IP:3001 > /dev/null; then
    echo "✓ Admin is running"
else
    echo "✗ Admin is not responding"
fi

# Test Server (Port 5000)
echo -n "Testing Server (Port 5000): "
if curl -s http://$VPS_IP:5000 > /dev/null; then
    echo "✓ Server is running"
else
    echo "✗ Server is not responding"
fi

# Test MongoDB (Port 27017)
echo -n "Testing MongoDB (Port 27017): "
if nc -z $VPS_IP 27017 2>/dev/null; then
    echo "✓ MongoDB is running"
else
    echo "✗ MongoDB is not responding"
fi

echo ""
echo "Service URLs:"
echo "Client:  http://$VPS_IP:3000"
echo "Admin:   http://$VPS_IP:3001"
echo "Server:  http://$VPS_IP:5000"
echo "MongoDB: $VPS_IP:27017"
