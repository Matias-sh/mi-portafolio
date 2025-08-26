import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from django.contrib.auth.models import User

# Crear superusuario si no existe
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@portfolio.com', 'admin123')
    print("Superusuario creado: admin/admin123")
else:
    print("Superusuario ya existe")