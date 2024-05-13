from django.db import models
from django.utils import timezone

class AdminUser(models.Model):
    pass


class BlogPost(models.Model):

    class PostCategory(models.TextChoices):
        TUTORIALS = 'Tutorials'
        NEWS_AND_UPDATES = 'News and Updates'
        TIPS_AND_TRICKS = 'Tips and Tricks'
        OTHERS = 'Others'
        
    category = models.CharField(max_length=100, choices=PostCategory, default=PostCategory.TUTORIALS) 
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    content = models.TextField()
    cover_image = models.ImageField(upload_to='blogpost-images', blank=True)
    date_posted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'<{self.title}, {self.category}>'


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    edition = models.IntegerField(default=1)
    isbn = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f'<{self.title}, {self.author}>'

        
class Chapter(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    number = models.IntegerField()
    
    def __str__(self):
        return f'<{self.book.title}, {self.title}, {self.number}>'

class Solution(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    exercise_number = models.CharField(max_length=5)
    answer = models.TextField()
    image = models.ImageField(upload_to='solution-images', blank=True)

    def __str__(self):
        return f'<{self.chapter.title},{self.exercise_number}>' 


