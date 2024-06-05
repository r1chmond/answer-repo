from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer
from .models import *
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BlogPostImageSerializer(serializers.ModelSerializer):
    model= BlogPostImage
    fields = 'image'

class BlogPostSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True)

    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'images']
    
    # def create(self, validated_data):
    #     logger.debug(f'Validated data: {validated_data} =======================================')
    #     images_data = validated_data.pop('images')
    #     blogpost = BlogPost.objects.create(**validated_data)
    #     for image_data in images_data:
    #         BlogPostImage.objects.create(blogpost=blogpost, **image_data)
    #     return blogpost

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'
        
class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__' 

class CustomUserSerializer(serializers.ModelSerializer):
    model = User
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



