from django.contrib.auth.models import User
from django.db import models
from trees.models import Tree
from django.utils import timezone



#
class Object(models.Model):
    tree = models.ForeignKey(Tree)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

#
class Field(models.Model):
    name = models.CharField(max_length = 255)
    value = models.CharField(max_length = 255)
    object = models.ForeignKey(Object)

    def __str__(self):
        return self.name
