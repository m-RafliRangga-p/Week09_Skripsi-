from django.urls import path
from public_app import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('faq/', views.faq, name='faq'),
    path('mentors/', views.mentors, name='mentors'),
    path('courses/', views.course, name='course'),

    # harus login
    path('courses/<int:pk>/', views.course_detail, name='course_detail'),
    path('dashboard/', views.dashboard, name='dashboard'),
]
