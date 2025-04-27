from rest_framework import serializers
from .models import Mobile
from django.contrib.auth.models import User

class MobileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mobile
        fields = ['id', 'name', 'brand', 'price', 'ram', 'storage', 'camera', 'battery', 'processor', 'image_url', 'user']  # Ensure 'user' is included in the fields list

    def create(self, validated_data):
        # Automatically add the user to the validated data
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']