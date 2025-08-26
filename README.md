# 🛡️ Cybersecurity Portfolio - Matías Britez

[![CI/CD Pipeline](https://github.com/yourusername/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/portfolio/actions/workflows/ci.yml)
[![Deploy to Pages](https://github.com/yourusername/portfolio/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/yourusername/portfolio/actions/workflows/deploy-pages.yml)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=yourusername_portfolio&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=yourusername_portfolio)
[![Coverage](https://codecov.io/gh/yourusername/portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/portfolio)

Portfolio profesional de Matías Britez - Desarrollador Android especializado en transición hacia Ciberseguridad Ofensiva y Red Team Operations.

## 🚀 Demo en Vivo

- **Producción**: [https://yourusername.github.io/portfolio](https://yourusername.github.io/portfolio)
- **API Docs**: [https://api.portfolio.com/docs](https://api.portfolio.com/docs)

## 🏗️ Arquitectura

### Backend
- **Framework**: Django 4.2+ con Django REST Framework
- **Base de datos**: PostgreSQL (producción) / SQLite (desarrollo)
- **Cache**: Redis para sesiones y cache de aplicación
- **Autenticación**: JWT + Session-based auth
- **APIs**: RESTful APIs con documentación OpenAPI/Swagger

### Frontend
- **Framework**: React 18 con Hooks modernos
- **Styling**: Tailwind CSS con tema cyberpunk personalizado
- **Animations**: Framer Motion para transiciones suaves
- **Build**: Vite para desarrollo rápido y builds optimizados
- **Routing**: React Router v6 con lazy loading

### DevOps & Deployment
- **Containerización**: Docker multi-stage builds
- **Orquestación**: Docker Compose para desarrollo
- **CI/CD**: GitHub Actions con testing automatizado
- **Deployment**: GitHub Pages (frontend) + Railway/Heroku (backend)
- **Proxy**: Nginx con SSL/TLS y rate limiting
- **Monitoring**: Logs estructurados y health checks

## 🛠️ Stack Tecnológico

### Backend Technologies
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Django](https://img.shields.io/badge/Django-4.2-green?logo=django)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-7-red?logo=redis)

### Frontend Technologies
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-4.0-purple?logo=vite)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-24-blue?logo=docker)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-green?logo=github-actions)
![Nginx](https://img.shields.io/badge/Nginx-1.25-green?logo=nginx)

## 🚀 Inicio Rápido

### Prerrequisitos
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (para producción)
- Redis 7+ (para producción)
- Docker & Docker Compose (opcional)

### Instalación con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Levantar servicios
docker-compose up --build

# Ejecutar migraciones (primera vez)
docker-compose exec web python manage.py migrate

# Crear superusuario
docker-compose exec web python manage.py createsuperuser

# Poblar con datos de ejemplo
docker-compose exec web python populate_simple.py
```

### Instalación Manual

#### Backend Setup
```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Poblar datos de ejemplo
python populate_simple.py

# Ejecutar servidor de desarrollo
python manage.py runserver
```

#### Frontend Setup
```bash
# Instalar dependencias de Node.js
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 📁 Estructura del Proyecto

```
portfolio/
├── 📁 .github/workflows/     # GitHub Actions CI/CD
├── 📁 frontend/             # Aplicación React
│   ├── 📁 src/
│   │   ├── 📁 components/   # Componentes reutilizables
│   │   ├── 📁 pages/        # Páginas principales
│   │   ├── 📁 hooks/        # Custom React hooks
│   │   └── 📁 utils/        # Utilidades y helpers
│   └── 📄 index.html
├── 📁 main/                 # App principal Django
│   ├── 📄 models.py         # Modelos de datos
│   ├── 📄 views.py          # APIs y vistas
│   ├── 📄 admin.py          # Configuración admin
│   └── 📄 urls.py           # Rutas de la API
├── 📁 writeups/             # App para CTF writeups
├── 📁 static/               # Archivos estáticos
├── 📁 templates/            # Templates Django
├── 📁 media/                # Archivos de media
├── 📄 docker-compose.yml    # Configuración Docker
├── 📄 Dockerfile           # Imagen Docker
├── 📄 nginx.conf           # Configuración Nginx
└── 📄 requirements.txt     # Dependencias Python
```

## 🎨 Diseño & UI/UX

### Tema Cyberpunk
- **Paleta de colores**: Azules tecnológicos, cyan matrix, verde hacker
- **Tipografía**: JetBrains Mono (código) + Orbitron (títulos)
- **Efectos visuales**: Matriz de fondo, glitch effects, animaciones suaves
- **Iconografía**: Lucide React con temática tech/security

### Responsive Design
- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Performance**: Lazy loading, code splitting, image optimization

## 🔒 Seguridad

### Medidas Implementadas
- **HTTPS**: SSL/TLS obligatorio en producción
- **HSTS**: Strict Transport Security headers
- **CSP**: Content Security Policy configurada
- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **CSRF Protection**: Tokens CSRF en formularios
- **SQL Injection**: Protección mediante ORM de Django
- **XSS Protection**: Sanitización de inputs y outputs

### Headers de Seguridad
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Performance

### Métricas Objetivo
- **Lighthouse Score**: >90 en todas las categorías
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3.0s

### Optimizaciones
- **Code Splitting**: Carga lazy de componentes React
- **Image Optimization**: Formatos WebP/AVIF + lazy loading
- **CDN**: Archivos estáticos servidos desde CDN
- **Compression**: Gzip/Brotli en Nginx
- **Caching**: Redis para cache de aplicación + HTTP caching

## 🧪 Testing

```bash
# Backend tests
python manage.py test
coverage run --source='.' manage.py test
coverage report

# Frontend tests
npm run test
npm run test:coverage

# Linting
python -m flake8
npm run lint

# Security scanning
bandit -r .
safety check
```

## 📈 Monitoreo

### Logs
- **Formato**: JSON estructurado
- **Nivel**: INFO en producción, DEBUG en desarrollo
- **Rotación**: Diaria con retención de 30 días

### Health Checks
- **Endpoint**: `/api/health/`
- **Checks**: Database, Redis, External APIs
- **Docker**: HEALTHCHECK configured

### Métricas (Opcional)
- **APM**: New Relic / Datadog integration ready
- **Error Tracking**: Sentry configuration available
- **Uptime**: StatusPage.io monitoring

## 🚢 Deployment

### GitHub Pages (Frontend Only)
```bash
# Automático via GitHub Actions al hacer push a main
# URL: https://yourusername.github.io/portfolio
```

### Railway/Heroku (Full Stack)
```bash
# Configurar variables de entorno en la plataforma
# Deploy automático desde GitHub
```

### VPS/Servidor Propio
```bash
# Clonar en servidor
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Configurar environment
cp .env.example .env
# Editar variables de producción

# Deploy con Docker
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Variables de Entorno

Ver `.env.example` para la lista completa. Variables críticas:

```env
# Obligatorias
SECRET_KEY=your-unique-secret-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Base de datos
DB_NAME=portfolio_db
DB_USER=portfolio_user  
DB_PASSWORD=strong-password
DB_HOST=localhost

# Email
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código
- **Python**: PEP 8 + Black formatter
- **JavaScript**: ESLint + Prettier
- **Commits**: Conventional Commits format
- **Tests**: Cobertura mínima 80%

## 📝 Changelog

Ver [CHANGELOG.md](CHANGELOG.md) para el historial de cambios.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Matías Britez**
- 🌐 Website: [https://matiasbritez.dev](https://matiasbritez.dev)
- 📧 Email: matias.britez@example.com
- 💼 LinkedIn: [@matiasbritez](https://linkedin.com/in/matiasbritez)
- 🐱 GitHub: [@matiasbritez](https://github.com/matiasbritez)

## 🙏 Agradecimientos

- [Django](https://djangoproject.com) - Framework web de Python
- [React](https://reactjs.org) - Biblioteca de JavaScript
- [Tailwind CSS](https://tailwindcss.com) - Framework de CSS
- [Framer Motion](https://framer.com/motion) - Animaciones
- [Lucide React](https://lucide.dev) - Iconos
- Comunidad de ciberseguridad argentina

---

⭐ **Si este proyecto te resultó útil, considera darle una estrella en GitHub!**