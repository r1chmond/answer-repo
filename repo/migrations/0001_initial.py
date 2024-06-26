# Generated by Django 5.0.6 on 2024-05-09 16:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AdminUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=200)),
                ('message', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=100)),
                ('edition', models.IntegerField(default=1)),
                ('isbn', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chapter', models.CharField(max_length=100)),
                ('chapter_number', models.IntegerField()),
                ('exercise_number', models.CharField(max_length=3)),
                ('answer', models.TextField()),
                ('image', models.ImageField(upload_to='')),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repo.book')),
            ],
        ),
    ]
