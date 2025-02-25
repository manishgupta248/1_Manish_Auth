from django.db import models

class Course(models.Model):
    COURSE_NAME = models.CharField(max_length=255)
    COURSE_CODE = models.CharField(max_length=10, unique=True)
    CATEGORY_CHOICES = [
        ('Credits', 'Credits'),
        ('CBCS', 'CBCS'),
    ]
    CATEGORY = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    
    COURSE_CATEGORY_CHOICES = [
        ('COMPULSORY', 'Compulsory'),
        ('ELECTIVE', 'Elective'),
    ]
    COURSE_CATEGORY = models.CharField(max_length=10, choices=COURSE_CATEGORY_CHOICES)
    
    TYPE_CHOICES = [
        ('DISSERTATION', 'Dissertation'),
        ('LABORATORY', 'Laboratory'),
        ('PRACTICAL', 'Practical'),
        ('PROJECT', 'Project'),
        ('THEORY', 'Theory'),
        ('THEORY_AND_PRACTICAL', 'Theory and Practical'),
        ('TUTORIAL', 'Tutorial'),
    ]
    TYPE = models.CharField(max_length=20, choices=TYPE_CHOICES)
    
    CREDIT_SCHEME_CHOICES = [
        ('CREDIT', 'Credit'),
        ('CBCS', 'CBCS'),
        ('NEP', 'NEP'),
    ]
    CREDIT_SCHEME = models.CharField(max_length=10, choices=CREDIT_SCHEME_CHOICES)
    
    CBCS_CATEGORY_CHOICES = [
        ('MAJOR', 'Major'),
        ('MINOR', 'Minor'),
        ('CORE', 'Core'),
        ('DSE', 'DSE'),
        ('GE', 'GE'),
        ('OE', 'OE'),
        ('VAC', 'VAC'),
        ('AECC', 'AECC'),
        ('SEC', 'SEC'),
        ('MDC', 'MDC'),
        ('IDC', 'IDC'),
    ]
    CBCS_CATEGORY = models.CharField(max_length=5, choices=CBCS_CATEGORY_CHOICES)
    
    DISCIPLINE = models.CharField(max_length=255)
    MAXIMUM_CREDIT = models.IntegerField(default=0)
    QUALIFYING_IN_NATURE_CHOICES = [
        ('YES', 'Yes'),
        ('NO', 'No'),
    ]
    QUALIFYING_IN_NATURE = models.CharField(max_length=3, choices=QUALIFYING_IN_NATURE_CHOICES)

    def __str__(self):
        return self.COURSE_NAME
