# academic/models.py
from django.db import models

class Department(models.Model):
    FACULTY_CHOICES = [
        ('Informatics & Computing', 'Informatics & Computing'),
        ('Engineering & Technology', 'Engineering & Technology'),
        ('Sciences', 'Sciences'),
        ('Life Sciences', 'Life Sciences'),
        ('Management', 'Management'),
        ('Languages & Media Studies', 'Languages & Media Studies'),
        ('CCSD', 'CCSD'),
    ]

    name = models.CharField(max_length=100, unique=True)
    faculty = models.CharField(max_length=50, choices=FACULTY_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.faculty})"
