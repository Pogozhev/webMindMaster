from rest_framework import serializers
from fields.models import *
from objects.serializers import *

class FieldSerializer(serializers.ModelSerializer):
    object = ObjectSerializer
    class Meta:
        model = Field
        fields = ('name', 'value', 'object')