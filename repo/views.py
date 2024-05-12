from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

class SolutionView(viewsets.ModelViewSet):
    serializer_class = SolutionSerializer

    def get_queryset(self):
        book_id = self.request.query_params.get('book_id')
        if book_id:
            return Solution.objects.filter(book=book_id)
        else:
            return Solution.objects.all()
        
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class BlogPostView(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
