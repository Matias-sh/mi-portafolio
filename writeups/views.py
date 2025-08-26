from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import WriteUp, Category, Tag, Tool


@api_view(['GET'])
def writeups_api(request):
    """API para obtener writeups"""
    try:
        writeups = WriteUp.objects.filter(is_published=True)
        
        # Filtros opcionales
        category = request.GET.get('category')
        platform = request.GET.get('platform')
        difficulty = request.GET.get('difficulty')
        featured = request.GET.get('featured', '').lower() == 'true'
        
        if category:
            writeups = writeups.filter(category__slug=category)
        if platform:
            writeups = writeups.filter(platform=platform)
        if difficulty:
            writeups = writeups.filter(difficulty=difficulty)
        if featured:
            writeups = writeups.filter(is_featured=True)
        
        data = []
        for writeup in writeups:
            data.append({
                'id': writeup.id,
                'title': writeup.title,
                'slug': writeup.slug,
                'subtitle': writeup.subtitle,
                'platform': writeup.platform,
                'difficulty': writeup.difficulty,
                'difficulty_color': writeup.get_difficulty_color(),
                'summary': writeup.summary,
                'featured_image': writeup.featured_image.url if writeup.featured_image else None,
                'is_featured': writeup.is_featured,
                'reading_time': writeup.reading_time,
                'views_count': writeup.views_count,
                'published_at': writeup.published_at,
                'category': {
                    'name': writeup.category.name,
                    'slug': writeup.category.slug,
                    'color': writeup.category.color
                } if writeup.category else None,
                'tags': [{'name': tag.name, 'slug': tag.slug} for tag in writeup.tags.all()]
            })
        
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def writeup_detail_api(request, slug):
    """API para obtener detalle de un writeup"""
    try:
        writeup = get_object_or_404(WriteUp, slug=slug, is_published=True)
        
        # Incrementar contador de vistas
        writeup.views_count += 1
        writeup.save(update_fields=['views_count'])
        
        data = {
            'id': writeup.id,
            'title': writeup.title,
            'slug': writeup.slug,
            'subtitle': writeup.subtitle,
            'platform': writeup.platform,
            'difficulty': writeup.difficulty,
            'difficulty_color': writeup.get_difficulty_color(),
            'machine_ip': writeup.machine_ip,
            'machine_url': writeup.machine_url,
            'summary': writeup.summary,
            'content': writeup.content,
            'featured_image': writeup.featured_image.url if writeup.featured_image else None,
            'is_featured': writeup.is_featured,
            'reading_time': writeup.reading_time,
            'views_count': writeup.views_count,
            'published_at': writeup.published_at,
            'updated_at': writeup.updated_at,
            'category': {
                'name': writeup.category.name,
                'slug': writeup.category.slug,
                'color': writeup.category.color,
                'icon': writeup.category.icon
            } if writeup.category else None,
            'tags': [{'name': tag.name, 'slug': tag.slug} for tag in writeup.tags.all()],
            'images': [{
                'image': img.image.url,
                'caption': img.caption,
                'alt_text': img.alt_text
            } for img in writeup.images.all()]
        }
        
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def categories_api(request):
    """API para obtener categorías"""
    try:
        categories = Category.objects.all()
        data = []
        for category in categories:
            data.append({
                'id': category.id,
                'name': category.name,
                'slug': category.slug,
                'description': category.description,
                'color': category.color,
                'icon': category.icon,
                'writeups_count': category.writeup_set.filter(is_published=True).count()
            })
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def tags_api(request):
    """API para obtener tags"""
    try:
        tags = Tag.objects.all()
        data = []
        for tag in tags:
            data.append({
                'id': tag.id,
                'name': tag.name,
                'slug': tag.slug,
                'writeups_count': tag.writeup_set.filter(is_published=True).count()
            })
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def tools_api(request):
    """API para obtener herramientas"""
    try:
        tools = Tool.objects.all()
        category = request.GET.get('category')
        
        if category:
            tools = tools.filter(category=category)
        
        data = []
        for tool in tools:
            data.append({
                'id': tool.id,
                'name': tool.name,
                'description': tool.description,
                'category': tool.category,
                'official_url': tool.official_url,
                'github_url': tool.github_url,
                'icon': tool.icon,
                'is_free': tool.is_free
            })
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
