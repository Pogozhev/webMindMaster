from django.db import models
from trees.models import Tree


class Object(models.Model):
    tree = models.ForeignKey(Tree)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name


def getObjects(tree):
    objects = Object.objects.filter(tree=tree).order_by('address')
    return objects


