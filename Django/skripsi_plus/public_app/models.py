from django.db import models

# Create your models here.
class Mentor(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='mentors/')
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    experience = models.PositiveIntegerField(help_text="Experience in years")
    specialization = models.CharField(max_length=100)
    bio = models.TextField()
    education = models.TextField(help_text="Educational background")
    skills = models.TextField(help_text="Comma-separated list of skills")

    def __str__(self):
        return self.name
