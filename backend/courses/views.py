from rest_framework import viewsets, permissions, filters
#from django_filters.rest_framework import DjangoFilterBackend
#from rest_framework.pagination import PageNumberPagination
from .models import Course
from .serializers import CourseSerializer

#class CoursePagination(PageNumberPagination):
#    page_size = 10

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny] #add this line
   # permission_classes = [permissions.IsAuthenticated]
    #filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    #filterset_fields = ['CATEGORY', 'COURSE_CATEGORY', 'DISCIPLINE']
    #search_fields = ['COURSE_NAME', 'COURSE_CODE']
    #pagination_class = CoursePagination