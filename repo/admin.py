from django.contrib import admin
from .models import *

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('category','author','title', 'message')


class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')

class SolutionAdmin(admin.ModelAdmin):
    list_display = ('book', 'chapter_title', 'chapter_number', 'exercise_number', 'answer')

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Solution, SolutionAdmin)
