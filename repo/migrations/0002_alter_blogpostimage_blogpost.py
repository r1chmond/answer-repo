# Generated by Django 5.0.6 on 2024-06-25 22:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpostimage',
            name='blogpost',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='repo.blogpost'),
        ),
    ]
