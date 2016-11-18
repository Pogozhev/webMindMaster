from rest_framework import serializers
from trees.models import Tree

class TreeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tree
        fields = '__all__'
