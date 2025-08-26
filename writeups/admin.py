from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Tag, WriteUp, WriteUpImage, Tool


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color_display', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    
    def color_display(self, obj):
        return format_html(
            '<span style="background-color: {}; padding: 4px 8px; color: white; border-radius: 3px;">{}</span>',
            obj.color,
            obj.color
        )
    color_display.short_description = 'Color'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


class WriteUpImageInline(admin.TabularInline):
    model = WriteUpImage
    extra = 1
    fields = ['image', 'caption', 'alt_text']


@admin.register(WriteUp)
class WriteUpAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'platform', 'difficulty_badge', 'category', 
        'is_featured', 'is_published', 'views_count', 'published_at'
    ]
    list_filter = ['platform', 'difficulty', 'category', 'is_featured', 'is_published', 'created_at']
    search_fields = ['title', 'subtitle', 'summary', 'content']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    inlines = [WriteUpImageInline]
    ordering = ['-published_at']
    
    fieldsets = [
        ('Información Básica', {
            'fields': [
                'title', 'slug', 'subtitle', 'category', 'tags',
                'platform', 'difficulty', 'machine_ip', 'machine_url'
            ]
        }),
        ('Contenido', {
            'fields': ['summary', 'content', 'reading_time']
        }),
        ('Media y Estado', {
            'fields': ['featured_image', 'is_featured', 'is_published']
        }),
        ('Estadísticas', {
            'fields': ['views_count'],
            'classes': ['collapse']
        }),
    ]
    
    readonly_fields = ['views_count', 'created_at', 'updated_at']
    
    def difficulty_badge(self, obj):
        colors = {
            'easy': '#10b981',
            'medium': '#f59e0b', 
            'hard': '#ef4444',
            'insane': '#8b5cf6',
        }
        color = colors.get(obj.difficulty, '#6b7280')
        return format_html(
            '<span style="background-color: {}; padding: 4px 8px; color: white; border-radius: 3px; font-size: 12px;">{}</span>',
            color,
            obj.get_difficulty_display()
        )
    difficulty_badge.short_description = 'Dificultad'
    
    def mark_as_featured(self, request, queryset):
        queryset.update(is_featured=True)
    mark_as_featured.short_description = "Marcar como destacado"
    
    def mark_as_published(self, request, queryset):
        queryset.update(is_published=True)
    mark_as_published.short_description = "Marcar como publicado"
    
    actions = [mark_as_featured, mark_as_published]


@admin.register(WriteUpImage)
class WriteUpImageAdmin(admin.ModelAdmin):
    list_display = ['writeup', 'caption', 'created_at']
    list_filter = ['created_at']
    search_fields = ['writeup__title', 'caption']


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_free', 'has_github', 'created_at']
    list_filter = ['category', 'is_free', 'created_at']
    search_fields = ['name', 'description', 'category']
    ordering = ['category', 'name']
    
    fieldsets = [
        ('Información Básica', {
            'fields': ['name', 'description', 'category', 'icon']
        }),
        ('Enlaces', {
            'fields': ['official_url', 'github_url']
        }),
        ('Estado', {
            'fields': ['is_free']
        }),
    ]
    
    def has_github(self, obj):
        return bool(obj.github_url)
    has_github.boolean = True
    has_github.short_description = 'GitHub'
