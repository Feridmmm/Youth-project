# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from base.views import get_csrf, logout_view, user_detail_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('api/csrf/', get_csrf, name='get_csrf'),
    path('api/logout/', logout_view, name='logout'),
    path('api/user/', user_detail_view, name='user_detail'),
    
]
