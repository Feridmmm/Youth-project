from django.http import JsonResponse
from django.contrib.auth import logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework import viewsets, status
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.contrib.auth import authenticate, get_user_model, update_session_auth_hash
from .models import CustomUser, School, Kindergarten, SocialChildProject, SocialTeenagerProject, CartItem
from .serializers import SchoolSerializer, KindergartenSerializer, SocialChildProjectSerializer, SocialTeenagerProjectSerializer, UserSerializer

User = get_user_model()

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class KindergartenViewSet(viewsets.ModelViewSet):
    queryset = Kindergarten.objects.all()
    serializer_class = KindergartenSerializer

class SocialChildProjectViewSet(viewsets.ModelViewSet):
    queryset = SocialChildProject.objects.all()
    serializer_class = SocialChildProjectSerializer

class SocialTeenagerProjectViewSet(viewsets.ModelViewSet):
    queryset = SocialTeenagerProject.objects.all()
    serializer_class = SocialTeenagerProjectSerializer

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        address = request.data.get('address')
        zip_code = request.data.get('zip_code')

        if not (email and password):
            return Response({'error': 'Please provide all required fields'}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(email=email, password=password, address=address, zip_code=zip_code)
        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            serializer = UserSerializer(user)
            return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication, BasicAuthentication, JWTAuthentication])
def logout_view(request):
    try:
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication, BasicAuthentication, JWTAuthentication])
def save_item_view(request):
    try:
        user = request.user
        item_type = request.data.get('item_type')
        item_id = request.data.get('item_id')
        address = request.data.get('address')
        phone = request.data.get('phone')
        postal_code = request.data.get('postal_code')
        image = request.data.get('image')

        cart_item = CartItem.objects.create(
            user=user,
            item_type=item_type,
            item_id=item_id,
            address=address,
            phone=phone,
            postal_code=postal_code,
            image=image
        )
        cart_item.save()

        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication, BasicAuthentication, JWTAuthentication])
def user_detail_view(request):
    try:
        user = request.user
        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication, BasicAuthentication, JWTAuthentication])
def update_user_view(request):
    try:
        user = request.user 
        address = request.data.get('address')
        zip_code = request.data.get('zip_code')
        password = request.data.get('password')

        if address:
            user.address = address
        if zip_code:
            user.zip_code = zip_code
        if password:
            user.set_password(password)

        user.save()

        # Ensure the session keeps the user logged in after password change
        if password:
            update_session_auth_hash(request, user)

        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
