#!/bin/bash

# Netlify build script for React basketball game
echo "Starting Netlify build process..."

# Install all dependencies including devDependencies
npm ci --include=dev

# Run the Vite build for the client app only
echo "Building React application..."
npx vite build

echo "Build completed successfully!"