#!/bin/bash

# Development setup script for Matías Britez Portfolio
# This script sets up the development environment

set -e

echo "🛠️ Portfolio Development Setup"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check Python version
if ! command -v python3 &> /dev/null; then
    print_warning "Python 3 not found. Please install Python 3.11+"
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
if [[ $(echo "$PYTHON_VERSION 3.11" | awk '{print ($1 >= $2)}') == 1 ]]; then
    print_status "Python $PYTHON_VERSION found"
else
    print_warning "Python 3.11+ required, found $PYTHON_VERSION"
fi

# Check Node.js version
if ! command -v node &> /dev/null; then
    print_warning "Node.js not found. Please install Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [[ $NODE_VERSION -ge 18 ]]; then
    print_status "Node.js v$NODE_VERSION found"
else
    print_warning "Node.js 18+ required, found v$NODE_VERSION"
fi

# Create .env for development if it doesn't exist
if [ ! -f .env ]; then
    print_info "Creating development .env file..."
    cat > .env << 'EOF'
SECRET_KEY=dev-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Development Database (SQLite)
DB_NAME=db.sqlite3
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

# Development Email (Console backend)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST_USER=dev@portfolio.local
EMAIL_HOST_PASSWORD=dev-password

# Social Links (customize these)
LINKEDIN_URL=https://linkedin.com/in/yourusername
GITHUB_URL=https://github.com/yourusername
TWITTER_URL=https://twitter.com/yourusername
EOF
    print_status "Development .env file created"
fi

# Set up Python virtual environment
if [ ! -d "venv" ]; then
    print_info "Creating Python virtual environment..."
    python3 -m venv venv
    print_status "Virtual environment created"
fi

# Activate virtual environment and install dependencies
print_info "Installing Python dependencies..."
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null || {
    print_warning "Could not activate virtual environment. Please run manually:"
    echo "  source venv/bin/activate  # Linux/Mac"
    echo "  venv\\Scripts\\activate     # Windows"
    echo "  pip install -r requirements.txt"
}

if command -v pip &> /dev/null; then
    pip install -r requirements.txt
    print_status "Python dependencies installed"
fi

# Install Node.js dependencies
print_info "Installing Node.js dependencies..."
npm install
print_status "Node.js dependencies installed"

# Run Django migrations
print_info "Setting up database..."
if command -v python &> /dev/null; then
    python manage.py migrate
    print_status "Database migrations completed"
fi

# Create superuser
print_info "Setting up admin user..."
if command -v python &> /dev/null; then
    python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@portfolio.dev', 'admin123')
    print('Admin user created: admin/admin123')
else:
    print('Admin user already exists')
"
    print_status "Admin user ready"
fi

# Populate with sample data
print_info "Adding sample data..."
if command -v python &> /dev/null; then
    python populate_simple.py
    print_status "Sample data added"
fi

# Create development scripts
cat > start-dev.sh << 'EOF'
#!/bin/bash
echo "Starting development servers..."

# Start Django server in background
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate
python manage.py runserver &
DJANGO_PID=$!

# Start React dev server
npm run dev &
REACT_PID=$!

echo "Django server: http://localhost:8000"
echo "React server: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt
trap "kill $DJANGO_PID $REACT_PID; exit" INT
wait
EOF

chmod +x start-dev.sh
print_status "Development start script created"

# Display setup information
echo ""
echo "🎉 Development setup completed!"
echo "==============================="
echo ""
echo "🚀 Getting Started:"
echo "   ./start-dev.sh                 # Start both servers"
echo "   python manage.py runserver     # Django only (port 8000)"
echo "   npm run dev                    # React only (port 3000)"
echo ""
echo "🔗 Development URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000/api/"
echo "   Admin Panel: http://localhost:8000/admin/"
echo "   Health Check: http://localhost:8000/api/health/"
echo ""
echo "🔑 Admin Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "🛠️ Useful Commands:"
echo "   python manage.py shell         # Django shell"
echo "   python manage.py test          # Run tests"
echo "   npm run lint                   # Check code style"
echo "   npm run build                  # Build for production"
echo ""
print_status "Ready to start developing!"