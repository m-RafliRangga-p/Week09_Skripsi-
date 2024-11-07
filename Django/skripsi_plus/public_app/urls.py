from django.urls import path 
from public_app import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('faq/', views.faq, name='faq'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('mentors/', views.mentors, name='mentors'),
    path('courses/', views.course, name='course'),
    path('courses/<int:pk>/', views.course_detail, name='course_detail'),
]