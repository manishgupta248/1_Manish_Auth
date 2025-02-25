from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account.urls')),
    path('api/', include('courses.urls')),
    path('api/academic/', include('academic.urls')),  # Academic App API
]
