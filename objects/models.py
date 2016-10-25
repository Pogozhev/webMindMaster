from django.db import models
from trees.models import Tree


# Create your models here.
class Object(models.Model):
    tree = models.ForeignKey(Tree)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def dump(self):
        """
        Функция представления объекта в JSON
        """
        return '{ "Object" : "' + self.name + '", ' + '"Address" : "' + self.address + '", "Tree" : "' + self.Tree.dump() + '" }'


def getObjects(tree):
    """
    Функция получения всех объектов выбранного дерева
    :return:
    """
    objects = Object.objects.filter(tree=tree).order_by('address')
    return objects