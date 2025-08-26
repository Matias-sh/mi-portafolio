# Multi-stage build for production
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy frontend source
COPY frontend/ .
COPY vite.config.js ../
COPY tailwind.config.js ../
COPY postcss.config.js ../

# Build frontend
RUN npm run build

# Python stage
FROM python:3.11-slim AS backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=portfolio_project.settings_production

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 django \
    && adduser --system --uid 1001 --gid 1001 --no-create-home django

# Copy Python requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install gunicorn psycopg2-binary

# Copy application code
COPY . .

# Copy built frontend files
COPY --from=frontend-builder /app/static/dist ./static/dist

# Create necessary directories
RUN mkdir -p logs staticfiles media \
    && chown -R django:django /app

# Collect static files
RUN python manage.py collectstatic --noinput --settings=portfolio_project.settings_production

# Switch to non-root user
USER django

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/health/ || exit 1

# Start command
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "--worker-class", "gthread", "--worker-connections", "1000", "--max-requests", "1000", "--max-requests-jitter", "50", "--timeout", "30", "portfolio_project.wsgi:application"]