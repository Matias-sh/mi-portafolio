import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from main.models import Profile, Skill, Experience, Project, Certification
from writeups.models import Category, Tag, Tool

def main():
    print("Creando datos de ejemplo...")
    
    # Crear perfil
    profile, created = Profile.objects.get_or_create(
        name="Matias Britez",
        defaults={
            'title': "Tecnico en Programacion | Cybersecurity Specialist",
            'bio': "Desarrollador Android especializado en Kotlin. En transicion hacia Ciberseguridad Ofensiva.",
            'email': 'matias.britez@example.com',
            'linkedin_url': 'https://linkedin.com/in/matiasbritez',
            'github_url': 'https://github.com/matiasbritez',
        }
    )
    print("Perfil creado" if created else "Perfil ya existe")
    
    # Crear algunas skills
    skills = [
        {'name': 'Nmap', 'category': 'pentesting', 'proficiency': 90},
        {'name': 'Burp Suite', 'category': 'pentesting', 'proficiency': 80},
        {'name': 'Kotlin', 'category': 'mobile', 'proficiency': 95},
        {'name': 'Django', 'category': 'backend', 'proficiency': 90},
        {'name': 'Python', 'category': 'backend', 'proficiency': 92},
    ]
    
    for skill_data in skills:
        skill, created = Skill.objects.get_or_create(
            name=skill_data['name'],
            defaults=skill_data
        )
        if created:
            print(f"Skill creada: {skill.name}")
    
    # Crear proyecto
    project, created = Project.objects.get_or_create(
        slug='vulnscan-pro',
        defaults={
            'title': 'VulnScan Pro',
            'project_type': 'security',
            'description': 'Herramienta automatizada de escaneo de vulnerabilidades web.',
            'technologies': 'Python,Django,React',
            'is_featured': True,
            'is_active': True
        }
    )
    if created:
        print(f"Proyecto creado: {project.title}")
    
    # Crear categorias de writeups
    categories = [
        {'name': 'Web Exploitation', 'slug': 'web-exploitation', 'color': '#ef4444'},
        {'name': 'Binary Exploitation', 'slug': 'binary-exploitation', 'color': '#8b5cf6'},
    ]
    
    for cat_data in categories:
        cat, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"Categoria creada: {cat.name}")
    
    print(f"\nDatos creados exitosamente!")
    print(f"Perfiles: {Profile.objects.count()}")
    print(f"Skills: {Skill.objects.count()}")
    print(f"Proyectos: {Project.objects.count()}")
    print(f"Categorias: {Category.objects.count()}")

if __name__ == '__main__':
    main()