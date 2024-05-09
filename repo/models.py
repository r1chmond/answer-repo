from django.db import models

# Create your models here.

class AdminUser(models.Model):
    pass

class BlogPost(models.Model):
    category = models.CharField(max_length=100) 
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return self.title

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    edition = models.IntegerField(default=1)
    isbn = models.CharField(max_length=50)

    def __str__(self):
        return f'<{self.title}, {self.author}>'

class Solution(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    chapter = models.CharField(max_length=100)
    chapter_number = models.IntegerField()
    exercise_number = models.CharField(max_length=3)
    answer = models.TextField()
    image = models.ImageField()

    def __str__(self):
        return f'<{self.chapter_number} {self.chapter}, ex. {self.exercise_number}>' 


