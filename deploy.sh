#!/bin/bash

# Exit on error
set -e

# Pull latest changes
git pull

# Build and start containers in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Remove unused images
docker image prune -f

echo "Deployment completed successfully!"

