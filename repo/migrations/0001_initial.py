# Generated by Django 5.0.6 on 2024-05-20 12:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('Tutorials', 'Tutorials'), ('News and Updates', 'News And Updates'), ('Tips and Tricks', 'Tips And Tricks'), ('Others', 'Others')], default='Tutorials', max_length=30)),
                ('connection_platform', models.CharField(choices=[('Website', 'Website'), ('Email', 'Email'), ('Twitter(X)', 'Twitter X'), ('Instagram', 'Instagram'), ('Github', 'Github'), ('LinkedIn', 'Linkedin')], default='Email', max_length=12)),
                ('connect_author', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('cover_image', models.ImageField(blank=True, upload_to='blogpost-images')),
                ('date_posted', models.DateField(auto_now_add=True)),
                ('time_posted', models.TimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date_posted'],
            },
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=100)),
                ('edition', models.IntegerField(default=1)),
                ('isbn', models.CharField(blank=True, max_length=50)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('number', models.IntegerField()),
                ('completion_status', models.CharField(choices=[('Pending', 'Pending'), ('Under Review', 'Under Review'), ('Completed', 'Completed')], default='Pending', max_length=15)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repo.book')),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exercise_type', models.CharField(choices=[('Review Question', 'Review Question'), ('Exercise', 'Exercise')], default='Exercise', max_length=20)),
                ('exercise_number', models.CharField(max_length=5)),
                ('answer', models.TextField()),
                ('image', models.ImageField(blank=True, upload_to='solution-images')),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repo.chapter')),
            ],
        ),
    ]
