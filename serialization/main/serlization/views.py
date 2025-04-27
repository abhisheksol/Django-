from django.shortcuts import render, HttpResponse
from django.http import JsonResponse  # Correct import for JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response
from . import models
from .serializers import MobileSerializer, UserSerializer
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')  # Optional field
        
        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new user
        user = User.objects.create_user(username=username, password=password, email=email)
        
        # Create a token for the user
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'username': user.username,
            'email': user.email,
            'token': token.key  # Send the token back to the user
        }, status=status.HTTP_201_CREATED)
    
# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    mobile_data=models.Mobile.objects.all()
    serializer=MobileSerializer(mobile_data,many=True)
    print(serializer.data)
    return JsonResponse(serializer.data, safe=False)

# post method to create a new mobile entry
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    data = request.data.copy()
    data['user'] = request.user.id  # Inject user id into data
    serializer = MobileSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    else:
        return JsonResponse(serializer.errors, status=400)
    

    
# delete method to delete a mobile entry
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete(request,id):
    try:
            mobile=models.Mobile.objects.get(id=id , user=request.user)
            mobile.delete()
            return JsonResponse({"message":"Deleted"},status=204)
    except models.Mobile.DoesNotExist:
            return JsonResponse({"error":"Mobile not found"},status=404)
    


# update method to update a mobile entry
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(req, id):
    try:
        mobile = models.Mobile.objects.get(id=id, user=req.user)
    except models.Mobile.DoesNotExist:
        return JsonResponse({"error": "Mobile not found"}, status=404)

    serializer = MobileSerializer(mobile, data=req.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=200)
    else:
        return JsonResponse(serializer.errors, status=400)
    


# User profile view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return JsonResponse(serializer.data, status=200)
    

     
