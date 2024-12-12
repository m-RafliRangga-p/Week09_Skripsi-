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
    path('dashboard-courses/<int:pk>/', views.course_bought, name='course_bought'),
    path("dashboard-courses/<int:course_id>/lesson/<int:section_index>/<int:lesson_index>/", views.lesson_detail, name="lesson_detail"),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('checkout/mentor/<int:mentor_id>/', views.mentor_checkout, name='mentor_checkout'),
    path('course/<int:course_id>/checkout/', views.course_checkout, name='course_checkout'),
    path('dashboard-mentors/', views.dashboard_mentors, name='dashboard_mentors'),
    path('dashboard-courses/', views.dashboard_courses, name='dashboard_courses'),
    path('profile/', views.profile_view, name='profile'),
    path('mentor/<int:pk>/', views.mentor_detail_view, name='mentor_detail'),
    path('profile/edit/', views.edit_profile_view, name='edit_profile'),
    path('booking/<int:booking_id>/', views.detail_booking, name='detail_booking'),
]
