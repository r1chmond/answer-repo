# Generated by Django 5.0.6 on 2024-05-10 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repo', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='solution',
            old_name='chapter',
            new_name='chapter_title',
        ),
    ]
