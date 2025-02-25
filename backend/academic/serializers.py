# academic/serializers.py
from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

# Serializer to provide faculty choices for the frontend
class FacultyChoiceSerializer(serializers.Serializer):
    value = serializers.CharField()
    label = serializers.CharField()
