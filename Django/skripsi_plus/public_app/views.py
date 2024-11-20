from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Mentor, Course
from django.db.models import Q


def home(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def faq(request):
    return render(request, 'faq.html')


def mentors(request):
    # print("GET data:", request.GET)
    query = request.GET.get('query')  # Ambil nilai pencarian dari URL
    # print("Query yang diterima:", query)
    mentors = Mentor.objects.all()

    if query:
        # Filter berdasarkan nama, rating, atau skill menggunakan Q objects
        mentors = mentors.filter(
            Q(name__icontains=query) |
            Q(rating__icontains=query) |
            Q(skills__icontains=query)
        ).distinct()  # distinct() menghindari hasil duplikasi

    for mentor in mentors:
        # Memisahkan education berdasarkan '\n' agar menjadi list
        mentor.education = mentor.education.split("\n")
        mentor.skills = mentor.skills.split(",")

    return render(request, 'mentors.html', {'mentors': mentors})


def course(request):
    query = request.GET.get('query')
    courses = Course.objects.all()

    if query:
        # Filter courses based on name or price using Q objects
        courses = courses.filter(
            Q(title__icontains=query) |
            Q(price__icontains=query)
        ).distinct()  # Use distinct() to avoid duplicate results

    return render(request, 'courses.html', {'courses': courses})


@login_required(login_url='account_login')
def course_detail(request, pk):
    course = get_object_or_404(Course, pk=pk)
    return render(request, 'detail-courses.html', {'course': course})


@login_required(login_url='account_login')
def dashboard(request):
    return render(request, 'dashboard.html')
