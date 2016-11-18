from rest_framework import serializers
from trees.serializers import *
from objects.models import *

class ObjectSerializer(serializers.ModelSerializer):
    tree = TreeSerializer
    class Meta:
        model = Object
        fields = '__all__'