from django.conf import settings
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
    price = models.DecimalField(max_digits=10, decimal_places=3, default=0.0, help_text="Consultation fee")

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=3)
    image = models.ImageField(upload_to='courses')
    syllabus = models.JSONField(null=True, blank=True)  # Jika memakai JSON untuk syllabus
    students_enrolled = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)
    learning_type = models.CharField(max_length=50, default="Online - Self Learning")

    def __str__(self):
        return self.title

class Purchase(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    mentor = models.ForeignKey(Mentor, on_delete=models.SET_NULL, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.mentor:
            return f"Mentor: {self.mentor.title} by {self.user.username}"
        elif self.course:
            return f"Course: {self.course.title} by {self.user.username}"
        return f"Purchase by {self.user.username}"