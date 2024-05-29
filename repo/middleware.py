
from typing import Any
from django.shortcuts import redirect
from django.urls import reverse

class PasswordChangeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        if request.admin_user.is_authenticated:
            if request.admin_user.needs_password_change and request.path != reverse('change_password'):
                return redirect('change_password')
        
        response = self.get_response(request)
        return response