from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    """
    Admin configuration for CustomUser model.
    """
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_admin', 'date_joined', 'last_login')
    list_filter = ('is_active', 'is_admin', 'date_joined')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_admin')}),
        ('Important dates', {'fields': ('last_login', )}),  # 'date_joined'
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = () #if you add groups or permissions fields, add them here.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password', 'password2'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)