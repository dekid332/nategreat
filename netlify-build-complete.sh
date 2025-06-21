#!/bin/bash
set -e

echo "Starting Netlify build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the client application only using Netlify config
echo "Building React application..."
npx vite build --config vite.config.netlify.ts

echo "Build completed successfully!"
echo "Built files are in dist/public/"