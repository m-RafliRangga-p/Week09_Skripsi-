from django.contrib import admin
from public_app.models import Mentor, Course, Purchase, Booking, Profile

# Register your models here.
admin.site.register(Mentor)
admin.site.register(Course)
admin.site.register(Purchase)
admin.site.register(Booking)
admin.site.register(Profile)

