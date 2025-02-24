from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    """
    Custom user manager to handle user creation and superuser creation.
    """

    def create_user(self, email, first_name, last_name, password=None):
        """
        Creates and saves a User with the given email, first_name, last_name and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)  # Normalize email to lowercase
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)  # Save the user to the database
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        """
        Creates and saves a superuser with the given email, first_name, last_name and password.
        """
        user = self.create_user(email, first_name, last_name, password)
        user.is_admin = True  # Set is_admin to True for superuser
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    """
    Custom user model extending AbstractBaseUser.
    """
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)  # Whether the user is active
    is_admin = models.BooleanField(default=False)  # Whether the user is an admin
    is_staff = models.BooleanField(default=False) #added is_staff
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)

    objects = CustomUserManager()  # Use the custom user manager

    USERNAME_FIELD = 'email'  # Field used for authentication
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Required fields for createsuperuser

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """
        Simplest possible implementation: All admins have all permissions.
        """
        return True

    def has_module_perms(self, app_label):
        """
        Simplest possible implementation: All admins have all permissions.
        """
        return True

    @property
    def is_staff(self):
        """
        Is the user a member of staff?
        """
        return self.is_admin