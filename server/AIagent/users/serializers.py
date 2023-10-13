from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'fullname']
        extra_kwargs = {'password': {'write_only': True},
                        'fullname': {'required': True}}
