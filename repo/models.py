from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_owner', True)
        return self.create_user(email, password, **extra_fields)
        
        

    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False, )
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return f'<{self.email}>'


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
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    connection_platform = models.CharField(max_length=12, choices=Platform, default=Platform.EMAIL)
    connect_author = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    content = models.TextField()
    # cover_image = models.ImageField(upload_to='blogpost-images', blank=True)
    date_posted = models.DateField(auto_now_add=True)
    time_posted = models.TimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date_posted']

    def __str__(self):
        return f'<{self.title}, {self.category}>'


class BlogPostImage(models.Model):
    blogpost = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=f'{blogpost.name}')

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    edition = models.IntegerField(default=1)
    isbn = models.CharField(max_length=50, blank=True)
    added_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

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
    added_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
     
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
    # image = models.ImageField(upload_to='solution-images', blank=True)
    added_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return f'<{self.chapter.title},{self.exercise_number}>' 


class SolutionImage(models.Model):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=f'{solution.name}')