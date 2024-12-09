from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['photo', 'phone', 'domicile']
        widgets = {
            'photo': forms.ClearableFileInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'domicile': forms.TextInput(attrs={'class': 'form-control'}),
        }
