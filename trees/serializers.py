from rest_framework import serializers
from trees.models import *
from django.contrib.auth.models import User

class TreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tree
        fields = ('id', 'name','creator','create_date')
