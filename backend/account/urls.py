from django.urls import path, include
from .views import LogoutView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
]
