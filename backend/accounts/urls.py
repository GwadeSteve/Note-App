from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserLogoutView, AuthStatus, GetAuthToken

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('auth_status/', AuthStatus, name='user-status'),
    path('get_auth_token/', GetAuthToken, name='user-token'),
]
