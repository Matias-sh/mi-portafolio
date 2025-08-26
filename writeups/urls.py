from django.urls import path
from . import views

app_name = 'writeups'

urlpatterns = [
    # APIs para WriteUps
    path('api/', views.writeups_api, name='writeups_api'),
    path('api/<slug:slug>/', views.writeup_detail_api, name='writeup_detail_api'),
    path('api/categories/', views.categories_api, name='categories_api'),
    path('api/tags/', views.tags_api, name='tags_api'),
    path('api/tools/', views.tools_api, name='tools_api'),
]