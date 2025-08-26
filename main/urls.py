from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    # Vista principal
    path('', views.home, name='home'),
    
    # APIs
    path('api/profile/', views.profile_api, name='profile_api'),
    path('api/skills/', views.skills_api, name='skills_api'),
    path('api/experience/', views.experience_api, name='experience_api'),
    path('api/projects/', views.projects_api, name='projects_api'),
    path('api/projects/<slug:slug>/', views.project_detail_api, name='project_detail_api'),
    path('api/certifications/', views.certifications_api, name='certifications_api'),
    path('api/contact/', views.contact_api, name='contact_api'),
    path('api/health/', views.health_check, name='health_check'),
]