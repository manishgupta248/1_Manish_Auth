# academic/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Department
from .serializers import DepartmentSerializer, FacultyChoiceSerializer

# Custom ViewSet for Department
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def get_permissions(self):
        """Set permissions based on the request method."""
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]  # GET requests (list & retrieve) are open
        return [permissions.IsAuthenticated()]  # POST, PUT, DELETE require auth

# API endpoint to get faculty choices
@api_view(['GET'])
@permission_classes([permissions.AllowAny])  # Ensure GET is open for choices
def faculty_choices(request):
    choices = Department.FACULTY_CHOICES
    data = [{'value': value, 'label': label} for value, label in choices]
    return Response(FacultyChoiceSerializer(data, many=True).data)