"""
URL configuration for main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register/', views.register, name='register'),
    path('',views.home, name='home'),
    path('create/',views.create, name='create'),
    path('delete/<int:id>/',views.delete, name='delete'),
    path('api-token-auth/', obtain_auth_token),  
    path('update/<int:id>/',views.update, name='update'), 
    path('profile/',views.profile, name='profile'),
   


]

# To test all endpoints in Postman:
# 1. Start your Django server (python manage.py runserver).
# 2. Open Postman.

# For GET all mobiles:
#   - Method: GET
#   - URL:    http://127.0.0.1:8000/
#   - No body required.

# For CREATE a mobile:
#   - Method: POST
#   - URL:    http://127.0.0.1:8000/create/
#   - Body:   raw, JSON (example):
#     {
#       "name": "iPhone 14",
#       "brand": "Apple",
#       "price": 999.99,
#       "ram": 6,
#       "storage": 128,
#       "camera": "12MP",
#       "battery": 3200,
#       "processor": "A15 Bionic",
#       "image_url": "https://example.com/image.jpg"
#     }

# For DELETE a mobile:
#   - Method: DELETE
#   - URL:    http://127.0.0.1:8000/delete/1/
#   - Replace '1' with the mobile's id.

# For obtaining an auth token (if authentication is enabled):
#   - Method: POST
#   - URL:    http://127.0.0.1:8000/api-token-auth/
#   - Body:   x-www-form-urlencoded
#     username: <your_username>
#     password: <your_password>
