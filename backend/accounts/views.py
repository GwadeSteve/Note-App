from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import CustomUserSerializer

class UserRegistrationView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            password = request.data.get('password')  
            user.set_password(password) 
            user.save() 

            user_data = {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'profile_pic': user.profile_pic if user.profile_pic else None
            }
            token = Token.objects.create(user=user) 
            return Response({'token': token.key, 'user': user_data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            user_data = {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'profile_pic': user.profile_pic if user.profile_pic else None
            }
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': user_data}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            Token.objects.get(user=request.user).delete()
        except Token.DoesNotExist:
            return Response({'error': 'User not logged in'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
