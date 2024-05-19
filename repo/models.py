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
    
    class Platform(models.TextChoices):
        WEBSITE = 'Website'
        EMAIL = 'Email'
        TWITTER_X = 'Twitter(X)'
        INSTAGRAM = 'Instagram'
        GITHUB = 'Github'
        LINKEDIN = 'LinkedIn'
        
    category = models.CharField(max_length=30, choices=PostCategory, default=PostCategory.TUTORIALS) 
    author = models.CharField(max_length=100)
    connection_platform = models.CharField(max_length=12, choices=Platform, default=Platform.EMAIL)
    connect_author = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    content = models.TextField()
    cover_image = models.ImageField(upload_to='blogpost-images', blank=True)
    date_posted = models.DateField(auto_now_add=True)
    time_posted = models.TimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date_posted']

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
    class CompletionStatus(models.TextChoices):
        PENDING = 'Pending'
        UNDER_REVIEW = 'Under Review'
        COMPLETED = 'Completed'
        
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    number = models.IntegerField()
    completion_status = models.CharField(max_length=15, choices=CompletionStatus, default=CompletionStatus.PENDING)
     
    def __str__(self):
        return f'<{self.book.title}, {self.title}, {self.number}>'

class Solution(models.Model):
    class ExerciseType(models.TextChoices):
        REVIEW_QUESTION = 'Review Question'
        Exercise = 'Exercise'
        
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    exercise_type = models.CharField(max_length=20, choices=ExerciseType, default= ExerciseType.Exercise)
    exercise_number = models.CharField(max_length=5)
    answer = models.TextField()
    image = models.ImageField(upload_to='solution-images', blank=True)

    def __str__(self):
        return f'<{self.chapter.title},{self.exercise_number}>' 


