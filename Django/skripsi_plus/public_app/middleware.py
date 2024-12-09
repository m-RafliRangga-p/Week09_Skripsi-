from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.models import User
from .models import Profile  # Sesuaikan 'myapp' dengan nama app Anda

class EnsureProfileMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.user.is_authenticated:
            try:
                # Cek apakah user memiliki profil
                request.user.profile  
            except Profile.DoesNotExist:
                # Jika tidak ada profil, buat instance baru
                Profile.objects.create(user=request.user)
