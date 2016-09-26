from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Tree(models.Model):
    """Description
    of class"""
    name = models.CharField(max_length=255)
    create_date = models.DateTimeField(default=timezone.now)
    creator = models.ForeignKey(User)

    def __str__(self):
        return self.name

# Класс, описывающий объект
class Object(models.Model):
    tree = models.ForeignKey(Tree)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Класс, описывающий поле описания объекта
class Field(models.Model):
    name = models.CharField(max_length = 255)
    value = models.CharField(max_length = 255)
    object = models.ForeignKey(Object)

    def __str__(self):
        return self.name
