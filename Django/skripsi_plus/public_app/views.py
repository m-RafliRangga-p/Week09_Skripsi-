from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Mentor, Course, Purchase, Booking
from django.db.models import Q
from django.http import JsonResponse, Http404
from datetime import datetime, date
from .forms import ProfileForm
import json


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
    purchases = Purchase.objects.filter(user=request.user)
    bookings = Booking.objects.filter(user=request.user)

    context = {
        'purchases': purchases,
        'bookings': bookings
    }
    return render(request, 'dashboard.html', context)

def mentor_checkout(request, mentor_id):
    mentor = get_object_or_404(Mentor, id=mentor_id)
    
    if request.method == "POST":
        # Simpan pembelian mentor
        Purchase.objects.create(user=request.user, mentor=mentor)
        return redirect('dashboard')  # Arahkan ke dashboard setelah checkout
    
    return render(request, 'mentor_checkout.html', {'mentor': mentor})

def course_checkout(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    
    if request.method == "POST":
        # Simpan pembelian
        Purchase.objects.create(user=request.user, course=course)
        return redirect('dashboard')  # Setelah checkout, arahkan ke dashboard
    
    return render(request, 'course_checkout.html', {'course': course})

@login_required(login_url='account_login')
def dashboard_mentors(request):
    purchases = Purchase.objects.filter(user=request.user)
    bookings = Booking.objects.filter(user=request.user)

    context = {
        'purchases': purchases,
        'bookings': bookings
    }
    return render(request, 'dashboard-mentors.html', context)

@login_required(login_url='account_login')
def dashboard_courses(request):
    purchases = Purchase.objects.filter(user=request.user)
    return render(request, 'dashboard-courses.html', {'purchases': purchases})

@login_required
def profile_view(request):
    if not request.user.is_authenticated:
        return redirect('account_login')

    # Ambil atau buat profil pengguna
    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        profile = Profile.objects.create(user=request.user)

    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('profile')  # Redirect ke halaman profil setelah sukses
    else:
        form = ProfileForm(instance=profile)

    return render(request, 'profile.html', {'form': form, 'user': request.user})

def mentor_detail_view(request, pk):
    mentor = Mentor.objects.get(pk=pk)
    bookings = mentor.bookings.all().order_by('date', 'time')  # Semua booking mentor, diurutkan
    
    if request.method == "POST":
        date = request.POST.get("date")
        time = request.POST.get("time")
        payment_image = request.FILES.get("payment_image")
        
        # Validasi booking
        existing_bookings = mentor.bookings.filter(date=date)
        if not validate_booking(existing_bookings, time):
            return render(request, 'dashboard_detail_mentor.html', {
                'mentor': mentor,
                'bookings': bookings,
                'error': 'Time slot unavailable. Please select another time.'
            })
        
        # Buat booking baru
        Booking.objects.create(
            mentor=mentor,
            user=request.user,
            date=date,
            time=time,
            payment_image=payment_image,
            status='PENDING'
        )
        return redirect('mentor_detail', pk=pk)

    return render(request, 'dashboard_detail_mentor.html', {'mentor': mentor, 'bookings': bookings})

# Fungsi validasi waktu booking
def validate_booking(existing_bookings, new_time):
    from datetime import datetime
    new_time = datetime.strptime(new_time, '%H:%M').time()
    for booking in existing_bookings:
        existing_time = booking.time
        if abs(datetime.combine(date.min, existing_time) - datetime.combine(date.min, new_time)).seconds < 3600:
            return False  # Tidak valid jika beda waktu kurang dari 1 jam
    return True

@login_required
def edit_profile_view(request):
    profile = request.user.profile
    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = ProfileForm(instance=profile)
    return render(request, 'edit_profile.html', {'form': form})

@login_required(login_url='account_login')
def course_bought(request, pk):
    course = get_object_or_404(Course, pk=pk)
    return render(request, 'courses_bought.html', {'course': course})

def lesson_detail(request, course_id, section_index, lesson_index):
    course = get_object_or_404(Course, id=course_id)
    syllabus = course.syllabus

    try:
        section = syllabus[section_index]
        lesson = section["lessons"][lesson_index]
    except IndexError:
        raise Http404("Lesson not found.")

    context = {
        "course": course,
        "lesson": lesson,
    }
    return render(request, "lesson.html", context)

def detail_booking(request, booking_id):
    # Ambil data booking berdasarkan ID
    booking = get_object_or_404(Booking, id=booking_id)
    return render(request, 'detail_booking.html', {'booking': booking})