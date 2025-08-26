from django.db import models
from django.urls import reverse
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default="#00ffff", help_text="Color en hex (ej: #00ffff)")
    icon = models.CharField(max_length=50, blank=True, help_text="Clase CSS del ícono")
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Etiqueta"
        verbose_name_plural = "Etiquetas"
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class WriteUp(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
        ('insane', 'Insane'),
    ]
    
    PLATFORM_CHOICES = [
        ('hackthebox', 'HackTheBox'),
        ('tryhackme', 'TryHackMe'),
        ('vulnhub', 'VulnHub'),
        ('ctftime', 'CTFTime'),
        ('picoctf', 'PicoCTF'),
        ('overthewire', 'OverTheWire'),
        ('custom', 'Custom Lab'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    subtitle = models.CharField(max_length=300, blank=True)
    
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    machine_ip = models.GenericIPAddressField(blank=True, null=True)
    machine_url = models.URLField(blank=True)
    
    summary = models.TextField(help_text="Resumen corto del writeup")
    content = models.TextField(help_text="Contenido completo en Markdown")
    
    featured_image = models.ImageField(upload_to='writeups/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    reading_time = models.IntegerField(default=5, help_text="Tiempo estimado de lectura en minutos")
    views_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "WriteUp"
        verbose_name_plural = "WriteUps"
        ordering = ['-published_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('writeup_detail', kwargs={'slug': self.slug})
    
    def get_difficulty_color(self):
        colors = {
            'easy': '#10b981',    # green
            'medium': '#f59e0b',  # yellow
            'hard': '#ef4444',    # red
            'insane': '#8b5cf6',  # purple
        }
        return colors.get(self.difficulty, '#6b7280')


class WriteUpImage(models.Model):
    writeup = models.ForeignKey(WriteUp, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='writeups/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    alt_text = models.CharField(max_length=200, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Imagen de WriteUp"
        verbose_name_plural = "Imágenes de WriteUps"
    
    def __str__(self):
        return f"Imagen para {self.writeup.title}"


class Tool(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)
    official_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    is_free = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Herramienta"
        verbose_name_plural = "Herramientas"
        ordering = ['name']
    
    def __str__(self):
        return self.name
