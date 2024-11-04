from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request, 'public_app/index.html')

def about(request):
    return render(request, 'public_app/about.html')

def faq(request):
    return render(request, 'public_app/faq.html')
