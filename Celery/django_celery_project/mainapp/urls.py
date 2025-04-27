from django.contrib import admin
from django.urls import path, include
from . import views  # Import the views from mainapp

urlpatterns = [
    path('',views.test, name='test'),  # Add this line to include the test view
]
