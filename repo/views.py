from rest_framework import viewsets, permissions, status
# from rest_framework.permissions import BasePermission,SAFE_METHODS
from rest_framework.views import APIView
from rest_framework.decorators import api_view, action
from django.contrib.auth import login, logout
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from .serializers import *
from .models import *
import logging
from django.http import JsonResponse 

logger = logging.getLogger(__name__)

class SolutionView(viewsets.ModelViewSet):
    serializer_class = SolutionSerializer

    def get_queryset(self):
        chapter_id = self.request.query_params.get('chapter_id')
        solution_id = self.request.query_params.get('solution_id')
        if chapter_id:
            return Solution.objects.filter(chapter=chapter_id)
        elif solution_id:
            return Solution.objects.filter(id=solution_id)
        else:
            return Solution.objects.all()

class ChapterView(viewsets.ModelViewSet):
    serializer_class = ChapterSerializer
    
    def get_queryset(self):
        book_id = self.request.query_params.get('book_id')
        chapter_id = self.request.query_params.get('chapter_id')
        if book_id:
            return Chapter.objects.filter(book=book_id)
        elif chapter_id:
             return Chapter.objects.filter(id=chapter_id)
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


class BlogPostAdminUserWritePermission(permissions.BasePermission):
    
    message = 'Editing post is restricted to the author only'
    def has_permission(self, request, view):
        if view.action in ['create', 'update', 'partial_update', 'destroy']:
            return request.user.is_authenticated and (request.user.is_superuser or request.user.is_staff)
        return True
    
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or obj.author == request.user
    
class BlogPostView(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        post_id = self.request.query_params.get('post_id')
        if post_id:
            return BlogPost.objects.filter(id=post_id)
        
        return BlogPost.objects.all()
    
    
    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), BlogPostAdminUserWritePermission()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Handle images if present
        images = request.FILES.getlist('images')
        for image in images:
            BlogPostImage.objects.create(blogpost_id=serializer.data['id'], image=image)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers) 
    # def perform_create(self, serializer):
    #     serializer.save()

    # def create(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class BlogPostImageView(viewsets.ModelViewSet):
    serializer_class = BlogPostImageSerializer
    
    def get_queryset(self):
        return BlogPostImage.objects.all()
        
class BlacklistTokenUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()
    
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            if not refresh_token:
                return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    

class HomeView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    
    def get(self, request):
        
        return Response({'message': 'This is a protected feed.'})

class CustomUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = CustomUserSerializer
    
    def get(self, request):
        user = request.user
        user_info = {
            'email': user.email
        }
        return Response(user_info) 

