from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['uid', 'name', 'type', 'description',
                  'created_by', 'created_at', 'status']
        extra_kwargs = {'name': {'required': True}, 'type': {
            'required': True}, 'description': {'required': True}}
