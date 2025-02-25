from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    COURSE_CODE = serializers.CharField(
        max_length=10,
        validators=[UniqueValidator(queryset=Course.objects.all())]
    )
    CATEGORY = serializers.ChoiceField(choices=Course.CATEGORY_CHOICES, source='get_CATEGORY_display')
    COURSE_CATEGORY = serializers.ChoiceField(choices=Course.COURSE_CATEGORY_CHOICES, source='get_COURSE_CATEGORY_display')
    TYPE = serializers.ChoiceField(choices=Course.TYPE_CHOICES, source='get_TYPE_display')
    CREDIT_SCHEME = serializers.ChoiceField(choices=Course.CREDIT_SCHEME_CHOICES, source='get_CREDIT_SCHEME_display')
    CBCS_CATEGORY = serializers.ChoiceField(choices=Course.CBCS_CATEGORY_CHOICES, source='get_CBCS_CATEGORY_display')
    QUALIFYING_IN_NATURE = serializers.ChoiceField(choices=Course.QUALIFYING_IN_NATURE_CHOICES, source='get_QUALIFYING_IN_NATURE_display')

    class Meta:
        model = Course
        fields = [
            'id',
            'COURSE_NAME',
            'COURSE_CODE',
            'CATEGORY',
            'COURSE_CATEGORY',
            'TYPE',
            'CREDIT_SCHEME',
            'CBCS_CATEGORY',
            'DISCIPLINE',
            'MAXIMUM_CREDIT',
            'QUALIFYING_IN_NATURE',
        ]

    def validate_MAXIMUM_CREDIT(self, value):
        if value < 0:
            raise serializers.ValidationError("Maximum credit cannot be negative.")
        return value