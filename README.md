# 🛡️ Cybersecurity Portfolio - Matías Britez

[![Deploy to GitHub Pages](https://github.com/Matias-sh/mi-portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Matias-sh/mi-portafolio/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwindcss)](https://tailwindcss.com/)

Portfolio profesional de Matías Britez - Desarrollador Android especializado en transición hacia Ciberseguridad Ofensiva y Red Team Operations.

## 🚀 Demo en Vivo

- **Producción**: [https://matias-sh.github.io/mi-portafolio](https://matias-sh.github.io/mi-portafolio)

## 🏗️ Arquitectura

### Frontend (SPA - Single Page Application)
- **Framework**: React 18 con Hooks modernos
- **Styling**: Tailwind CSS con tema cyberpunk personalizado
- **Animations**: Framer Motion para transiciones suaves
- **Build**: Vite para desarrollo rápido y builds optimizados
- **Routing**: React Router v6 con lazy loading
- **Form Handling**: React Hook Form + EmailJS para formularios de contacto
- **Icons**: Lucide React para iconografía moderna

### DevOps & Deployment
- **CI/CD**: GitHub Actions con despliegue automático
- **Hosting**: GitHub Pages (sitio estático)
- **Performance**: Code splitting automático y optimización de assets
- **SEO**: Meta tags optimizados y estructura semántica

## 🛠️ Stack Tecnológico

### Frontend Technologies
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-4.0-purple?logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-ff69b4?logo=framer)

### Development & Deployment
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-green?logo=github-actions)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Hosting-blue?logo=github)
![ESLint](https://img.shields.io/badge/ESLint-8-purple?logo=eslint)
![PostCSS](https://img.shields.io/badge/PostCSS-8-red?logo=postcss)

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ (Recomendado: última versión LTS)
- npm o yarn como gestor de paquetes
- Git para control de versiones

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/Matias-sh/mi-portafolio.git
cd mi-portafolio

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# La aplicación estará disponible en:
# http://localhost:3000/mi-portafolio/
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con hot reload

# Producción
npm run build        # Build optimizado para producción
npm run preview      # Preview del build de producción
npm run serve        # Servidor de preview (puerto 4173)

# Linting y formato
npm run lint         # Verificar estándares de código
npm run lint:fix     # Corregir problemas de linting automáticamente
npm run format       # Formatear código con Prettier

# Deployment (opcional)
npm run deploy       # Deploy manual a GitHub Pages
```

## 📁 Estructura del Proyecto

```
mi-portafolio/
├── 📁 .github/workflows/    # GitHub Actions para CI/CD
│   └── 📄 deploy.yml        # Workflow de despliegue automático
├── 📁 public/              # Archivos públicos estáticos
├── 📁 src/                 # Código fuente de la aplicación
│   ├── 📁 components/      # Componentes React reutilizables
│   │   ├── 📁 sections/    # Secciones principales del sitio
│   │   │   ├── 📄 HeroSection.jsx
│   │   │   ├── 📄 AboutSection.jsx
│   │   │   ├── 📄 SkillsSection.jsx
│   │   │   ├── 📄 ExperienceSection.jsx
│   │   │   ├── 📄 ProjectsSection.jsx
│   │   │   └── 📄 CertificationsSection.jsx
│   │   ├── 📄 Navbar.jsx    # Navegación principal
│   │   ├── 📄 Footer.jsx    # Pie de página
│   │   ├── 📄 MatrixBackground.jsx # Efecto Matrix de fondo
│   │   └── 📄 ScrollToTop.jsx # Botón scroll to top
│   ├── 📁 pages/           # Páginas/Vistas principales
│   │   ├── 📄 Home.jsx     # Página de inicio
│   │   ├── 📄 Projects.jsx # Página de proyectos
│   │   ├── 📄 ProjectDetail.jsx # Detalle de proyecto
│   │   └── 📄 Contact.jsx  # Página de contacto
│   ├── 📁 data/           # Datos estáticos en JSON
│   │   ├── 📄 profile.json     # Información personal
│   │   ├── 📄 experience.json  # Experiencia laboral
│   │   ├── 📄 projects.json    # Proyectos realizados
│   │   └── 📄 skills.json      # Habilidades técnicas
│   ├── 📄 App.jsx         # Componente raíz de la aplicación
│   ├── 📄 main.jsx        # Punto de entrada React
│   └── 📄 index.css       # Estilos globales y Tailwind CSS
├── 📄 index.html          # Template HTML principal
├── 📄 vite.config.js      # Configuración de Vite
├── 📄 tailwind.config.js  # Configuración de Tailwind CSS
├── 📄 postcss.config.js   # Configuración de PostCSS
├── 📄 package.json        # Dependencias y scripts de npm
└── 📄 README.md          # Documentación del proyecto
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

## 🧪 Testing & Calidad de Código

```bash
# Linting y validación de código
npm run lint         # ESLint para JavaScript/React
npm run lint:fix     # Auto-fix de problemas de linting

# Formateo de código
npm run format       # Prettier para formato consistente

# Build de validación
npm run build        # Verificar que el build es exitoso

# Preview local del build
npm run preview      # Probar la versión de producción localmente
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

### GitHub Pages (Automático)
```bash
# El deployment es automático via GitHub Actions
# Se ejecuta en cada push a la rama 'main'

# URL de producción:
# https://matias-sh.github.io/mi-portafolio/
```

### Deploy Manual (Opcional)
```bash
# Para deployments manuales ocasionales
npm run deploy

# Esto ejecutará:
# 1. npm run build (genera archivos optimizados)
# 2. gh-pages -d dist (sube a GitHub Pages)
```

### Configuración del Repositorio
```bash
# Asegurar que GitHub Pages esté habilitado:
# 1. Ir a Settings > Pages
# 2. Source: "Deploy from a branch"
# 3. Branch: "gh-pages" / root
# 4. O usar "GitHub Actions" (recomendado)
```

## 🔧 Configuración

### EmailJS (Opcional)
Para que el formulario de contacto funcione, configurar EmailJS:

```javascript
// En src/pages/Contact.jsx, reemplazar:
const EMAILJS_SERVICE_ID = 'your_service_id'
const EMAILJS_TEMPLATE_ID = 'your_template_id'
const EMAILJS_PUBLIC_KEY = 'your_public_key'
```

### Personalización
Para personalizar el contenido:

1. **Datos personales**: Editar `src/data/profile.json`
2. **Experiencia laboral**: Editar `src/data/experience.json`
3. **Proyectos**: Editar `src/data/projects.json`
4. **Habilidades**: Editar `src/data/skills.json`
5. **Colores del tema**: Modificar `tailwind.config.js`

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