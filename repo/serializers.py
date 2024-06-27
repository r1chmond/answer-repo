from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer
from .models import *
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
import logging
from django.http import HttpRequest

logger = logging.getLogger(__name__)

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    model = User
    fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BlogPostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= BlogPostImage
        fields = ['id', 'image']

class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    cover_image = serializers.ImageField(required=False)
    class Meta:
        model = BlogPost
        fields = '__all__'
        
    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user:
            validated_data['author'] = request.user
            return BlogPost.objects.create(**validated_data)
        return None
    

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'
        
class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__' 


# class CustomUserLoginSerializer(LoginSerializer):
#     username = None
#     email = serializers.EmailField(required=True, allow_blank=False)
    
#     def get_auth_user(self, email, password):
#         logger.debug(f'=============getting user auth {email}')
#         user = authenticate(request=self.context.get('request'), email=email, password=password)
        
#         if not user:
#             raise serializers.ValidationError('Invalid email or password')
#         return user 
    
#     def validate(self, attrs):
#         logger.debug(f'================Validating... {attrs.get('email')}')
#         email = attrs.get('email')
#         password = attrs.get('password')

#         user = self.get_auth_user(email, password)
#         if not user:
#             raise serializers.ValidationError('Invalid email or password')
        
#         attrs['user'] = user
#         return attrs



