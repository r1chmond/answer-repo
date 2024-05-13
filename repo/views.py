from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

class SolutionView(viewsets.ModelViewSet):
    serializer_class = SolutionSerializer

    def get_queryset(self):
        chapter_id = self.request.query_params.get('chapter_id')
        if chapter_id:
            return Solution.objects.filter(chapter=chapter_id)
        else:
            return Solution.objects.all()

class ChapterView(viewsets.ModelViewSet):
    serializer_class = ChapterSerializer
    
    def get_queryset(self):
        book_id = self.request.query_params.get('book_id')
        if book_id:
            return Chapter.objects.filter(book=book_id)
        else:
            return Chapter.objects.all()
        
        
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        book_id = self.request.query_params.get('book_id')
        if book_id:
            return Book.objects.filter(id=book_id)
        else:
            return Book.objects.all()

class BlogPostView(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
