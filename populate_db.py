import os
import django
from datetime import date, datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from main.models import Profile, Skill, Experience, Project, Certification
from writeups.models import Category, Tag, WriteUp, Tool

def create_profile():
    """Crear perfil principal"""
    profile, created = Profile.objects.get_or_create(
        name="Matías Britez",
        defaults={
            'title': "Técnico en Programación | Cybersecurity Specialist",
            'bio': '''Desarrollador Android especializado en Kotlin y Jetpack Compose con experiencia en el desarrollo de aplicaciones móviles robustas y escalables. 

Actualmente en transición hacia la Ciberseguridad Ofensiva, enfocándome en Red Team Operations y Penetration Testing. Estudiante avanzado de Licenciatura en Ciberdefensa en UNDEF.

Mi experiencia incluye trabajo en el Polo Científico Tecnológico y empresas como Push Software, donde he desarrollado soluciones tecnológicas innovadoras combinando desarrollo móvil con principios de seguridad.

Apasionado por la investigación de vulnerabilidades, CTFs y el aprendizaje continuo en el campo de la ciberseguridad.''',
            'email': 'matias.britez@example.com',
            'linkedin_url': 'https://linkedin.com/in/matiasbritez',
            'github_url': 'https://github.com/matiasbritez',
            'twitter_url': 'https://twitter.com/matiasbritez',
        }
    )
    if created:
        print("✓ Perfil creado")
    return profile

def create_skills():
    """Crear habilidades"""
    skills_data = [
        # Pentesting & Security
        {'name': 'OWASP Top 10', 'category': 'pentesting', 'proficiency': 85, 'icon': 'shield-check', 'description': 'Conocimiento profundo de las vulnerabilidades web más críticas'},
        {'name': 'Nmap', 'category': 'pentesting', 'proficiency': 90, 'icon': 'radar', 'description': 'Escaneo de puertos y descubrimiento de servicios'},
        {'name': 'Burp Suite', 'category': 'pentesting', 'proficiency': 80, 'icon': 'bug', 'description': 'Análisis de aplicaciones web y API testing'},
        {'name': 'Metasploit', 'category': 'pentesting', 'proficiency': 75, 'icon': 'target', 'description': 'Framework de explotación y post-explotación'},
        {'name': 'OSINT', 'category': 'pentesting', 'proficiency': 85, 'icon': 'search', 'description': 'Recolección de información de fuentes abiertas'},
        {'name': 'Social Engineering', 'category': 'pentesting', 'proficiency': 70, 'icon': 'users', 'description': 'Técnicas de ingeniería social y phishing'},
        
        # Mobile Development
        {'name': 'Kotlin', 'category': 'mobile', 'proficiency': 95, 'icon': 'smartphone', 'description': 'Desarrollo Android nativo con Kotlin'},
        {'name': 'Jetpack Compose', 'category': 'mobile', 'proficiency': 90, 'icon': 'layers', 'description': 'UI moderna y declarativa para Android'},
        {'name': 'Android Architecture', 'category': 'mobile', 'proficiency': 88, 'icon': 'building', 'description': 'MVVM, Clean Architecture, Repository Pattern'},
        {'name': 'Room Database', 'category': 'mobile', 'proficiency': 85, 'icon': 'database', 'description': 'Base de datos local SQLite para Android'},
        
        # Backend Development
        {'name': 'Django', 'category': 'backend', 'proficiency': 90, 'icon': 'server', 'description': 'Framework web de Python para desarrollo rápido'},
        {'name': 'Python', 'category': 'backend', 'proficiency': 92, 'icon': 'code', 'description': 'Programación backend y scripting'},
        {'name': 'PostgreSQL', 'category': 'backend', 'proficiency': 80, 'icon': 'database', 'description': 'Base de datos relacional avanzada'},
        {'name': 'REST APIs', 'category': 'backend', 'proficiency': 88, 'icon': 'api', 'description': 'Diseño e implementación de APIs RESTful'},
        
        # Tools & Platforms
        {'name': 'Git', 'category': 'tools', 'proficiency': 90, 'icon': 'git-branch', 'description': 'Control de versiones y colaboración'},
        {'name': 'Docker', 'category': 'tools', 'proficiency': 75, 'icon': 'container', 'description': 'Containerización y deployment'},
        {'name': 'Linux', 'category': 'tools', 'proficiency': 85, 'icon': 'terminal', 'description': 'Administración de sistemas Linux'},
        {'name': 'Kali Linux', 'category': 'tools', 'proficiency': 80, 'icon': 'terminal', 'description': 'Distribución para pentesting'},
    ]
    
    for skill_data in skills_data:
        skill, created = Skill.objects.get_or_create(
            name=skill_data['name'],
            defaults=skill_data
        )
        if created:
            print(f"✓ Skill creada: {skill.name}")

def create_experience():
    """Crear experiencia laboral"""
    experiences_data = [
        {
            'company': 'Polo Científico Tecnológico',
            'position': 'Desarrollador Django Backend',
            'location': 'Buenos Aires, Argentina',
            'start_date': date(2023, 3, 1),
            'end_date': date(2024, 1, 31),
            'current': False,
            'description': '''Desarrollo de aplicaciones web robustas utilizando Django y Python para proyectos científicos y tecnológicos.

• Implementación de APIs RESTful para integración con sistemas externos
• Desarrollo de dashboards administrativos complejos
• Optimización de consultas de base de datos PostgreSQL
• Implementación de medidas de seguridad y autenticación
• Colaboración en equipo utilizando metodologías ágiles''',
            'technologies': 'Django, Python, PostgreSQL, REST APIs, Git, Docker',
            'company_url': 'https://www.polo.gob.ar/'
        },
        {
            'company': 'Push Software',
            'position': 'Desarrollador Android',
            'location': 'Buenos Aires, Argentina',
            'start_date': date(2022, 6, 1),
            'end_date': date(2023, 2, 28),
            'current': False,
            'description': '''Desarrollo de aplicaciones móviles Android utilizando Kotlin y arquitecturas modernas.

• Migración de aplicaciones legacy a Jetpack Compose
• Implementación de arquitectura MVVM con Clean Architecture
• Integración con APIs REST y GraphQL
• Optimización de rendimiento y gestión de memoria
• Testing unitario y de integración con JUnit y Espresso''',
            'technologies': 'Kotlin, Android, Jetpack Compose, Room, Retrofit, MVVM',
            'company_url': 'https://pushsoftware.com/'
        },
        {
            'company': 'Orbita Push',
            'position': 'Desarrollador Junior Android',
            'location': 'Buenos Aires, Argentina',
            'start_date': date(2021, 8, 1),
            'end_date': date(2022, 5, 31),
            'current': False,
            'description': '''Primer experiencia profesional en desarrollo móvil, enfocada en aprendizaje y crecimiento técnico.

• Desarrollo de features para aplicaciones existentes
• Corrección de bugs y mejoras de UI/UX
• Aprendizaje de mejores prácticas de desarrollo Android
• Participación en code reviews y pair programming
• Documentación técnica de componentes desarrollados''',
            'technologies': 'Java, Android SDK, SQLite, REST APIs, Git',
            'company_url': '#'
        }
    ]
    
    for exp_data in experiences_data:
        exp, created = Experience.objects.get_or_create(
            company=exp_data['company'],
            position=exp_data['position'],
            defaults=exp_data
        )
        if created:
            print(f"✓ Experiencia creada: {exp.position} en {exp.company}")

def create_projects():
    """Crear proyectos"""
    projects_data = [
        {
            'title': 'VulnScan Pro',
            'slug': 'vulnscan-pro',
            'project_type': 'security',
            'description': 'Herramienta automatizada de escaneo de vulnerabilidades web con interfaz moderna.',
            'detailed_description': '''VulnScan Pro es una herramienta completa de pentesting automatizado que combina múltiples técnicas de escaneo para identificar vulnerabilidades en aplicaciones web.

**Características principales:**
• Escaneo automatizado de OWASP Top 10
• Integración con bases de datos de vulnerabilidades (CVE, NVD)
• Reportes detallados en PDF y HTML
• Dashboard interactivo para análisis de resultados
• API REST para integración con otras herramientas
• Soporte para autenticación y sesiones

**Tecnologías utilizadas:**
• Backend: Python, Django, Celery
• Frontend: React, TypeScript, Tailwind CSS
• Base de datos: PostgreSQL, Redis
• Tools: Nmap, Nikto, SQLmap integration''',
            'technologies': 'Python,Django,React,PostgreSQL,Nmap,Celery',
            'github_url': 'https://github.com/matiasbritez/vulnscan-pro',
            'demo_url': 'https://vulnscan-demo.example.com',
            'is_featured': True,
            'is_active': True
        },
        {
            'title': 'PetCare Manager',
            'slug': 'petcare-manager',
            'project_type': 'mobile',
            'description': 'App móvil para gestión integral de cuidado de mascotas desarrollada con Jetpack Compose.',
            'detailed_description': '''Aplicación móvil completa para el cuidado y gestión de mascotas, desarrollada con las últimas tecnologías de Android.

**Funcionalidades:**
• Perfil completo de mascotas con historial médico
• Recordatorios de vacunas y medicamentos
• Agenda de citas veterinarias
• Seguimiento de peso y crecimiento
• Diario de actividades y comportamiento
• Búsqueda de veterinarias cercanas con Maps API

**Arquitectura:**
• Clean Architecture con MVVM
• Repository Pattern para datos
• Inyección de dependencias con Hilt
• Base de datos local con Room
• Sincronización con API REST''',
            'technologies': 'Kotlin,Jetpack Compose,Room,Hilt,Retrofit,Maps API',
            'github_url': 'https://github.com/matiasbritez/petcare-manager',
            'live_url': 'https://play.google.com/store/apps/petcare',
            'is_featured': True,
            'is_active': True
        },
        {
            'title': 'CTF Challenges Platform',
            'slug': 'ctf-platform',
            'project_type': 'web',
            'description': 'Plataforma web para hosting de competencias CTF con sistema de scoring automático.',
            'detailed_description': '''Plataforma completa para organizar y participar en competencias de Capture The Flag (CTF) con funcionalidades avanzadas de scoring y administración.

**Características:**
• Sistema de usuarios con roles (admin, team, player)
• Categorías de desafíos (Web, Crypto, Forensics, PWN, etc.)
• Scoring dinámico basado en dificultad y tiempo
• Chat en tiempo real para equipos
• Dashboard de administración completo
• Sistema de hints progresivos
• Exportación de resultados y estadísticas

**Seguridad:**
• Contenedores Docker aislados para challenges
• Rate limiting y protección DDoS
• Logging completo de actividades
• Backup automático de base de datos''',
            'technologies': 'Django,Python,React,Docker,PostgreSQL,Redis,WebSockets',
            'github_url': 'https://github.com/matiasbritez/ctf-platform',
            'live_url': 'https://ctf.example.com',
            'is_featured': True,
            'is_active': True
        },
        {
            'title': 'Network Discovery Tool',
            'slug': 'network-discovery',
            'project_type': 'security',
            'description': 'Herramienta CLI para descubrimiento y mapeo de redes con detección de servicios.',
            'detailed_description': '''Herramienta de línea de comandos desarrollada en Python para el descubrimiento automático de dispositivos y servicios en redes locales y remotas.

**Funcionalidades:**
• Escaneo de redes con múltiples técnicas (ping, ARP, SYN)
• Detección de servicios y versiones
• Fingerprinting de sistemas operativos  
• Detección de vulnerabilidades conocidas
• Exportación en múltiples formatos (JSON, XML, CSV)
• Integración con bases de datos de vulnerabilidades
• Modo sigiloso para evitar detección

**Uso típico:**
```bash
python netdisco.py -t 192.168.1.0/24 --services --os-detect --vulns
python netdisco.py -f targets.txt --output json --threads 50
```''',
            'technologies': 'Python,Scapy,Threading,JSON,XML',
            'github_url': 'https://github.com/matiasbritez/network-discovery',
            'is_featured': False,
            'is_active': True
        }
    ]
    
    for project_data in projects_data:
        project, created = Project.objects.get_or_create(
            slug=project_data['slug'],
            defaults=project_data
        )
        if created:
            print(f"✓ Proyecto creado: {project.title}")

def create_certifications():
    """Crear certificaciones"""
    certifications_data = [
        {
            'name': 'Técnico Superior en Desarrollo de Software',
            'issuer': 'Instituto Tecnológico Superior',
            'issue_date': date(2021, 12, 15),
            'description': 'Título técnico en desarrollo de software con especialización en programación orientada a objetos y desarrollo web.'
        },
        {
            'name': 'Android Developer Course',
            'issuer': 'Google Developers',
            'issue_date': date(2022, 3, 20),
            'credential_url': 'https://developers.google.com/certification',
            'description': 'Certificación oficial en desarrollo Android con enfoque en Kotlin y arquitecturas modernas.'
        },
        {
            'name': 'Cybersecurity Fundamentals',
            'issuer': 'Cisco Networking Academy', 
            'issue_date': date(2023, 8, 10),
            'credential_url': 'https://cisco.netacad.com',
            'description': 'Fundamentos de ciberseguridad, incluyendo análisis de amenazas y técnicas de protección.'
        }
    ]
    
    for cert_data in certifications_data:
        cert, created = Certification.objects.get_or_create(
            name=cert_data['name'],
            issuer=cert_data['issuer'],
            defaults=cert_data
        )
        if created:
            print(f"✓ Certificación creada: {cert.name}")

def create_writeup_data():
    """Crear datos para writeups"""
    # Categories
    categories_data = [
        {'name': 'Web Exploitation', 'slug': 'web-exploitation', 'color': '#ef4444', 'icon': 'globe', 'description': 'Vulnerabilidades en aplicaciones web'},
        {'name': 'Binary Exploitation', 'slug': 'binary-exploitation', 'color': '#8b5cf6', 'icon': 'cpu', 'description': 'Explotación de binarios y buffer overflows'},
        {'name': 'Cryptography', 'slug': 'cryptography', 'color': '#06b6d4', 'icon': 'key', 'description': 'Criptografía y esteganografía'},
        {'name': 'Forensics', 'slug': 'forensics', 'color': '#10b981', 'icon': 'search', 'description': 'Análisis forense digital'},
        {'name': 'Network Security', 'slug': 'network-security', 'color': '#f59e0b', 'icon': 'wifi', 'description': 'Seguridad en redes y protocolos'},
    ]
    
    for cat_data in categories_data:
        cat, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"✓ Categoría creada: {cat.name}")
    
    # Tags
    tags_data = [
        'SQL Injection', 'XSS', 'CSRF', 'Buffer Overflow', 'RCE', 'LFI', 'RFI',
        'Privilege Escalation', 'Hash Cracking', 'Steganography', 'Memory Dump',
        'Packet Analysis', 'Wireshark', 'Metasploit', 'Burp Suite', 'Nmap'
    ]
    
    for tag_name in tags_data:
        tag, created = Tag.objects.get_or_create(
            name=tag_name,
            defaults={'slug': tag_name.lower().replace(' ', '-')}
        )
        if created:
            print(f"✓ Tag creado: {tag.name}")
    
    # Tools
    tools_data = [
        {'name': 'Burp Suite', 'category': 'Web Testing', 'description': 'Plataforma integrada para testing de seguridad en aplicaciones web', 'official_url': 'https://portswigger.net/burp', 'is_free': False},
        {'name': 'Nmap', 'category': 'Network Scanner', 'description': 'Escáner de red para descubrimiento de hosts y servicios', 'official_url': 'https://nmap.org', 'is_free': True},
        {'name': 'Metasploit', 'category': 'Exploitation', 'description': 'Framework de penetration testing y desarrollo de exploits', 'official_url': 'https://metasploit.com', 'is_free': False},
        {'name': 'Wireshark', 'category': 'Network Analysis', 'description': 'Analizador de protocolos de red', 'official_url': 'https://wireshark.org', 'is_free': True},
        {'name': 'John the Ripper', 'category': 'Password Cracking', 'description': 'Herramienta para cracking de passwords', 'official_url': 'https://openwall.com/john/', 'github_url': 'https://github.com/openwall/john', 'is_free': True},
    ]
    
    for tool_data in tools_data:
        tool, created = Tool.objects.get_or_create(
            name=tool_data['name'],
            defaults=tool_data
        )
        if created:
            print(f"✓ Herramienta creada: {tool.name}")

def main():
    """Función principal para poblar la base de datos"""
    print("Poblando base de datos con datos de ejemplo...")
    
    try:
        create_profile()
        create_skills()
        create_experience()
        create_projects()
        create_certifications()
        create_writeup_data()
        
        print("\nBase de datos poblada exitosamente!")
        print("\nResumen:")
        print(f"- Perfiles: {Profile.objects.count()}")
        print(f"- Skills: {Skill.objects.count()}")
        print(f"- Experiencias: {Experience.objects.count()}")
        print(f"- Proyectos: {Project.objects.count()}")
        print(f"- Certificaciones: {Certification.objects.count()}")
        print(f"- Categorias WriteUps: {Category.objects.count()}")
        print(f"- Tags: {Tag.objects.count()}")
        print(f"- Herramientas: {Tool.objects.count()}")
        
    except Exception as e:
        print(f"Error poblando la base de datos: {e}")

if __name__ == '__main__':
    main()