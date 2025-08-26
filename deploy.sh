#!/bin/bash

# Production deployment script for Matías Britez Portfolio
# This script sets up the portfolio for production deployment

set -e  # Exit on any error

echo "🚀 Portfolio Production Deployment Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_info "Please edit .env file with your production values"
        exit 1
    else
        print_error ".env.example not found!"
        exit 1
    fi
fi

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    print_status ".env file loaded"
fi

# Validate required environment variables
required_vars=("SECRET_KEY" "DB_PASSWORD" "EMAIL_HOST_USER")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        print_error "Required environment variable $var is not set!"
        exit 1
    fi
done
print_status "Environment variables validated"

# Check Docker availability
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not in PATH"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed or not in PATH"
    exit 1
fi
print_status "Docker and Docker Compose found"

# Create necessary directories
mkdir -p logs staticfiles media ssl
print_status "Directories created"

# Set proper permissions
chmod 755 logs staticfiles media
print_status "Permissions set"

# Build and start services
print_info "Building Docker images..."
docker-compose build --no-cache

print_info "Starting services..."
docker-compose up -d

# Wait for database to be ready
print_info "Waiting for database to be ready..."
sleep 10

# Run database migrations
print_info "Running database migrations..."
docker-compose exec -T web python manage.py migrate --noinput

# Collect static files
print_info "Collecting static files..."
docker-compose exec -T web python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
print_info "Setting up admin user..."
docker-compose exec -T web python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', '$EMAIL_HOST_USER', '$DB_PASSWORD')
    print('Admin user created')
else:
    print('Admin user already exists')
"

# Populate with sample data
print_info "Populating database with sample data..."
docker-compose exec -T web python populate_simple.py

# Health check
print_info "Performing health check..."
sleep 5

if curl -f http://localhost:8000/api/health/ > /dev/null 2>&1; then
    print_status "Health check passed"
else
    print_error "Health check failed"
    print_info "Checking logs..."
    docker-compose logs web
    exit 1
fi

# Display deployment information
echo ""
echo "🎉 Deployment completed successfully!"
echo "===================================="
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "🔗 Access URLs:"
echo "   Frontend: http://localhost"
echo "   API: http://localhost/api/"
echo "   Admin: http://localhost/admin/"
echo "   Health Check: http://localhost/api/health/"
echo ""
echo "🔑 Admin Credentials:"
echo "   Username: admin"
echo "   Password: [your DB_PASSWORD]"
echo ""
echo "📝 Next Steps:"
echo "   1. Configure SSL certificates in ./ssl/ directory"
echo "   2. Update DNS records to point to your server"
echo "   3. Configure monitoring and backups"
echo "   4. Review security settings in production"
echo ""
echo "📋 Useful Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Update deployment: git pull && docker-compose up -d --build"
echo ""
print_status "Portfolio is now running in production mode!"