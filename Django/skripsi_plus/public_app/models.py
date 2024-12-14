from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from uuid import uuid4

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

class Booking(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="bookings")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    zoom_link = models.URLField(max_length=200, blank=True, null=True)
    payment_image = models.ImageField(upload_to='payment_images/', blank=True, null=True)
    payment_status = models.CharField(max_length=20, choices=[('PENDING', 'Pending'), ('PAID', 'Paid')], default='PENDING')

    def __str__(self):
        return f"Booking by {self.user} with {self.mentor} on {self.date} at {self.time}"

    class Meta:
        unique_together = ('mentor', 'date', 'time')
    
    def save(self, *args, **kwargs):
        if not self.zoom_link:
            # Contoh Zoom Link Otomatis
            self.zoom_link = f"https://zoom.us/j/{uuid4().hex[:10]}"
        super().save(*args, **kwargs)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True, null=True)
    domicile = models.CharField(max_length=100, blank=True, null=True)
    photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"