from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from .models import Mentor


def home(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def faq(request):
    return render(request, 'faq.html')


def login_view(request):
    if request.method == 'POST':
        username_or_email = request.POST.get('username_or_email')
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=username_or_email)
            username = user.username
        except User.DoesNotExist:
            username = username_or_email

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # jika login berhasil
        else:
            messages.error(request, 'Username atau password salah')
    return render(request, 'login.html')


def register_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password == confirm_password:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username sudah digunakan')
            elif User.objects.filter(email=email).exists():
                messages.error(request, 'Email sudah digunakan')
            else:
                user = User.objects.create_user(
                    username=username, email=email, password=password)
                user.save()
                messages.success(
                    request, 'Registrasi berhasil! Silahkan login.')
                return redirect('login')
        else:
            messages.error(request, 'Password tidak sesuai')
    return render(request, 'register.html')


def logout_view(request):
    logout(request)
    return redirect('home')

def mentors(request):
    mentors = Mentor.objects.all()
    for mentor in mentors:
        # Memisahkan education berdasarkan '\n' agar menjadi list
        mentor.education = mentor.education.split("\n")
        mentor.skills = mentor.skills.split(",")
    
    
    return render(request, 'mentors.html', {'mentors': mentors})