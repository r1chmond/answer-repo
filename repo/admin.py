from typing import Any
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest
from .models import *

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_admin', 'is_owner', 'is_staff', 'is_active', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'is_admin', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('email',)
    ordering = ('email',)
    
    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser:
            raise PermissionError('Only superusers can create or modify admin users.')
        super().save_model(request, obj, form, change)
    
    def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(is_superuser=False)

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('id','category','author','title', 'content')

class BlogPostImageAdmin(admin.ModelAdmin):
    list_display = ('blogpost', 'image')

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')

class ChapterAdmin(admin.ModelAdmin):
    list_display = ('book', 'title', 'number')

class SolutionAdmin(admin.ModelAdmin):
    list_display = ('chapter', 'exercise_number', 'answer')

class SolutionImageAdmin(admin.ModelAdmin):
    list_display = ('solution', 'image')
    
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(BlogPostImage, BlogPostImageAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Solution, SolutionAdmin)
admin.site.register(SolutionImage, SolutionImageAdmin)
