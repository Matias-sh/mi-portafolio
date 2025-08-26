from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Profile, Skill, Experience, Project, Certification, ContactMessage
import json


def home(request):
    """Vista principal del portafolio"""
    return render(request, 'main/index.html')


@api_view(['GET'])
def profile_api(request):
    """API para obtener datos del perfil"""
    try:
        profile = Profile.objects.first()
        if not profile:
            return Response({'error': 'Profile not found'}, status=404)
        
        data = {
            'name': profile.name,
            'title': profile.title,
            'bio': profile.bio,
            'email': profile.email,
            'linkedin_url': profile.linkedin_url,
            'github_url': profile.github_url,
            'twitter_url': profile.twitter_url,
            'profile_image': profile.profile_image.url if profile.profile_image else None,
            'cv_file': profile.cv_file.url if profile.cv_file else None,
        }
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def skills_api(request):
    """API para obtener habilidades"""
    try:
        skills = Skill.objects.all()
        data = []
        for skill in skills:
            data.append({
                'id': skill.id,
                'name': skill.name,
                'category': skill.category,
                'proficiency': skill.proficiency,
                'icon': skill.icon,
                'description': skill.description
            })
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def experience_api(request):
    """API para obtener experiencia"""
    try:
        experiences = Experience.objects.all()
        data = []
        for exp in experiences:
            data.append({
                'id': exp.id,
                'company': exp.company,
                'position': exp.position,
                'location': exp.location,
                'start_date': exp.start_date,
                'end_date': exp.end_date,
                'current': exp.current,
                'description': exp.description,
                'technologies': exp.technologies.split(',') if exp.technologies else [],
                'company_url': exp.company_url
            })
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def projects_api(request):
    """API para obtener proyectos"""
    try:
        projects = Project.objects.filter(is_active=True)
        featured = request.GET.get('featured', '').lower() == 'true'
        
        if featured:
            projects = projects.filter(is_featured=True)
        
        data = []
        for project in projects:
            data.append({
                'id': project.id,
                'title': project.title,
                'slug': project.slug,
                'project_type': project.project_type,
                'description': project.description,
                'detailed_description': project.detailed_description,
                'technologies': project.technologies.split(',') if project.technologies else [],
                'github_url': project.github_url,
                'live_url': project.live_url,
                'demo_url': project.demo_url,
                'featured_image': project.featured_image.url if project.featured_image else None,
                'is_featured': project.is_featured,
                'created_at': project.created_at
            })
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def project_detail_api(request, slug):
    """API para obtener detalle de un proyecto"""
    try:
        project = get_object_or_404(Project, slug=slug, is_active=True)
        data = {
            'id': project.id,
            'title': project.title,
            'slug': project.slug,
            'project_type': project.project_type,
            'description': project.description,
            'detailed_description': project.detailed_description,
            'technologies': project.technologies.split(',') if project.technologies else [],
            'github_url': project.github_url,
            'live_url': project.live_url,
            'demo_url': project.demo_url,
            'featured_image': project.featured_image.url if project.featured_image else None,
            'is_featured': project.is_featured,
            'created_at': project.created_at,
            'updated_at': project.updated_at
        }
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def certifications_api(request):
    """API para obtener certificaciones"""
    try:
        certifications = Certification.objects.all()
        data = []
        for cert in certifications:
            data.append({
                'id': cert.id,
                'name': cert.name,
                'issuer': cert.issuer,
                'issue_date': cert.issue_date,
                'expiry_date': cert.expiry_date,
                'credential_id': cert.credential_id,
                'credential_url': cert.credential_url,
                'badge_image': cert.badge_image.url if cert.badge_image else None,
                'description': cert.description
            })
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@csrf_exempt
@api_view(['POST'])
def contact_api(request):
    """API para formulario de contacto"""
    try:
        data = json.loads(request.body)
        
        # Crear mensaje de contacto
        message = ContactMessage.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            subject=data.get('subject'),
            message=data.get('message'),
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        # Enviar email (opcional, configurar SMTP)
        try:
            send_mail(
                subject=f"Contacto Portfolio: {data.get('subject')}",
                message=f"Nombre: {data.get('name')}\nEmail: {data.get('email')}\n\nMensaje:\n{data.get('message')}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
        except Exception as email_error:
            print(f"Error enviando email: {email_error}")
        
        return Response({'success': True, 'message': 'Mensaje enviado correctamente'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def health_check(request):
    """Health check endpoint for monitoring"""
    try:
        from django.db import connection
        from django.core.cache import cache
        import time
        
        health_data = {
            'status': 'healthy',
            'timestamp': time.time(),
            'version': '1.0.0',
            'checks': {}
        }
        
        # Database check
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            health_data['checks']['database'] = {'status': 'healthy'}
        except Exception as e:
            health_data['checks']['database'] = {'status': 'unhealthy', 'error': str(e)}
            health_data['status'] = 'degraded'
        
        # Cache check (Redis)
        try:
            cache.set('health_check', 'ok', 30)
            cache_value = cache.get('health_check')
            if cache_value == 'ok':
                health_data['checks']['cache'] = {'status': 'healthy'}
            else:
                health_data['checks']['cache'] = {'status': 'unhealthy', 'error': 'Cache value mismatch'}
                health_data['status'] = 'degraded'
        except Exception as e:
            health_data['checks']['cache'] = {'status': 'unhealthy', 'error': str(e)}
            health_data['status'] = 'degraded'
        
        # Model counts (basic functionality check)
        try:
            health_data['checks']['models'] = {
                'profiles': Profile.objects.count(),
                'skills': Skill.objects.count(),
                'projects': Project.objects.count(),
                'status': 'healthy'
            }
        except Exception as e:
            health_data['checks']['models'] = {'status': 'unhealthy', 'error': str(e)}
            health_data['status'] = 'degraded'
        
        status_code = 200 if health_data['status'] == 'healthy' else 503
        return Response(health_data, status=status_code)
        
    except Exception as e:
        return Response({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': time.time()
        }, status=503)
