from typing import Any
from django.contrib import admin
from django.http.request import HttpRequest
from .models import *

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email',)
    
  

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('category','author','title', 'content')

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')

class ChapterAdmin(admin.ModelAdmin):
    list_display = ('book', 'title', 'number')

class SolutionAdmin(admin.ModelAdmin):
    list_display = ('chapter', 'exercise_number', 'answer')
    
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Solution, SolutionAdmin)
