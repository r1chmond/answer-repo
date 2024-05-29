# Generated by Django 5.0.6 on 2024-05-23 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repo', '0003_remove_blogpost_cover_image_remove_solution_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='category',
            field=models.CharField(choices=[('Tutorial', 'Tutorial'), ('News and Updates', 'News And Updates'), ('Tips and Tricks', 'Tips And Tricks'), ('Other', 'Other')], default='Tutorial', max_length=30),
        ),
        migrations.AlterField(
            model_name='blogpost',
            name='connection_platform',
            field=models.CharField(choices=[('Website', 'Website'), ('Email', 'Email'), ('Twitter(X)', 'Twitter X'), ('Instagram', 'Instagram'), ('Github', 'Github'), ('LinkedIn', 'Linkedin'), ('Other', 'Other')], default='Email', max_length=12),
        ),
        migrations.AlterField(
            model_name='blogpostimage',
            name='image',
            field=models.ImageField(upload_to='blogpost-images/'),
        ),
        migrations.AlterField(
            model_name='solutionimage',
            name='image',
            field=models.ImageField(upload_to='solution-images/'),
        ),
    ]
