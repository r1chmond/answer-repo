from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

class SolutionView(viewsets.ModelViewSet):
    serializer_class = SolutionSerializer
    queryset = Solution.objects.all()

class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class BlogPostView(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
