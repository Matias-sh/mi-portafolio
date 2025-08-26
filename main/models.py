from django.db import models
from django.urls import reverse


class Profile(models.Model):
    name = models.CharField(max_length=100, default="Matías Britez")
    title = models.CharField(max_length=200, default="Técnico en Programación | Cybersecurity Specialist")
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    cv_file = models.FileField(upload_to='documents/', blank=True, null=True)
    
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    email = models.EmailField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Perfil"
        verbose_name_plural = "Perfiles"
    
    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('pentesting', 'Pentesting & Security'),
        ('mobile', 'Desarrollo Mobile'),
        ('backend', 'Backend Development'),
        ('tools', 'Tools & Platforms'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(help_text="Nivel de 1 a 100")
    icon = models.CharField(max_length=50, blank=True, help_text="Clase CSS del ícono")
    description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Habilidad"
        verbose_name_plural = "Habilidades"
        ordering = ['-proficiency', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Experience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    current = models.BooleanField(default=False)
    description = models.TextField()
    technologies = models.CharField(max_length=500, help_text="Separadas por comas")
    company_url = models.URLField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Experiencia"
        verbose_name_plural = "Experiencias"
        ordering = ['-start_date']
    
    def __str__(self):
        return f"{self.position} en {self.company}"


class Project(models.Model):
    PROJECT_TYPES = [
        ('mobile', 'App Móvil'),
        ('web', 'Aplicación Web'),
        ('security', 'Proyecto de Seguridad'),
        ('ctf', 'CTF/Pentesting'),
        ('lab', 'Lab Practice'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES)
    description = models.TextField()
    detailed_description = models.TextField(blank=True)
    technologies = models.CharField(max_length=500, help_text="Separadas por comas")
    
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    
    featured_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('project_detail', kwargs={'slug': self.slug})


class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=100)
    issue_date = models.DateField(blank=True, null=True)
    expiry_date = models.DateField(blank=True, null=True)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)
    badge_image = models.ImageField(upload_to='certifications/', blank=True, null=True)
    description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Certificación"
        verbose_name_plural = "Certificaciones"
        ordering = ['-issue_date']
    
    def __str__(self):
        return f"{self.name} - {self.issuer}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    
    read = models.BooleanField(default=False)
    replied = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Mensaje de Contacto"
        verbose_name_plural = "Mensajes de Contacto"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
