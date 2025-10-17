#!/bin/bash

# EvolvoAI Deployment Script
set -e

echo "🚀 EvolvoAI Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your actual values before continuing."
        exit 1
    else
        print_error ".env.example file not found. Please create .env file manually."
        exit 1
    fi
fi

print_status "Checking environment variables..."

# Required environment variables
required_vars=(
    "JWT_SECRET"
    "ADMIN_EMAIL"
    "ADMIN_PASSWORD"
    "GEMINI_API_KEY"
    "TELEGRAM_BOT_TOKEN"
    "TELEGRAM_CHANNEL_ID"
)

# Check if required variables are set
missing_vars=()
for var in "${required_vars[@]}"; do
    if ! grep -q "^$var=" .env || grep -q "^$var=$" .env; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    print_error "Missing required environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
    print_warning "Please set these variables in .env file before deploying."
    exit 1
fi

print_success "Environment variables check passed!"

# Build and deploy
print_status "Building Docker images..."
docker-compose build --no-cache

print_status "Starting services..."
docker-compose up -d

print_status "Waiting for services to be ready..."
sleep 30

# Health checks
print_status "Performing health checks..."

# Check backend health
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    print_success "Backend is healthy!"
else
    print_error "Backend health check failed!"
    docker-compose logs backend
    exit 1
fi

# Check frontend health
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Frontend is healthy!"
else
    print_error "Frontend health check failed!"
    docker-compose logs frontend
    exit 1
fi

print_success "Deployment completed successfully!"
echo ""
echo "🌐 Your application is now running:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   Admin Panel: http://localhost:3000/admin"
echo ""
echo "📊 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo ""
print_warning "Don't forget to:"
echo "1. Set up SSL certificates in nginx/ssl/ directory"
echo "2. Configure your domain DNS to point to this server"
echo "3. Set up monitoring and backups"
echo "4. Review security settings"
