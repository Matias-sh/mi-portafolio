from django.contrib import admin
from django.utils.html import format_html
from .models import Profile, Skill, Experience, Project, Certification, ContactMessage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'updated_at']
    fields = [
        'name', 'title', 'bio', 'profile_image', 'cv_file',
        'email', 'linkedin_url', 'github_url', 'twitter_url'
    ]
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['category', '-proficiency']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['company', 'position', 'start_date', 'end_date', 'current']
    list_filter = ['current', 'start_date']
    search_fields = ['company', 'position', 'description']
    ordering = ['-start_date']
    
    fieldsets = [
        ('Información Básica', {
            'fields': ['company', 'position', 'location', 'company_url']
        }),
        ('Período', {
            'fields': ['start_date', 'end_date', 'current']
        }),
        ('Detalles', {
            'fields': ['description', 'technologies']
        }),
    ]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'project_type', 'is_featured', 'is_active', 'created_at']
    list_filter = ['project_type', 'is_featured', 'is_active', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['-created_at']
    
    fieldsets = [
        ('Información Básica', {
            'fields': ['title', 'slug', 'project_type', 'description', 'detailed_description']
        }),
        ('Enlaces', {
            'fields': ['github_url', 'live_url', 'demo_url']
        }),
        ('Media y Estado', {
            'fields': ['featured_image', 'is_featured', 'is_active', 'technologies']
        }),
    ]


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'issuer', 'issue_date', 'expiry_date', 'has_credential']
    list_filter = ['issuer', 'issue_date']
    search_fields = ['name', 'issuer', 'description']
    ordering = ['-issue_date']
    
    def has_credential(self, obj):
        return bool(obj.credential_url)
    has_credential.boolean = True
    has_credential.short_description = 'Tiene Credencial'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'email', 'read', 'replied', 'created_at']
    list_filter = ['read', 'replied', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['ip_address', 'user_agent', 'created_at']
    ordering = ['-created_at']
    
    fieldsets = [
        ('Mensaje', {
            'fields': ['name', 'email', 'subject', 'message']
        }),
        ('Estado', {
            'fields': ['read', 'replied']
        }),
        ('Información Técnica', {
            'fields': ['ip_address', 'user_agent', 'created_at'],
            'classes': ['collapse']
        }),
    ]
    
    def mark_as_read(self, request, queryset):
        queryset.update(read=True)
    mark_as_read.short_description = "Marcar como leído"
    
    def mark_as_replied(self, request, queryset):
        queryset.update(replied=True)
    mark_as_replied.short_description = "Marcar como respondido"
    
    actions = [mark_as_read, mark_as_replied]
