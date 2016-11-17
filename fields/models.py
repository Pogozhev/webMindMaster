from django.db import models
from objects.models import Object


class Field(models.Model):
    name = models.CharField(max_length = 255)
    value = models.CharField(max_length = 255)
    object = models.ForeignKey(Object)

    def __str__(self):
        return self.name


class FieldManager(models.Manager):
    def create_field(self,name,value,object):
        field = self.create(name=name, value=value, object=object)


def getFields(object):
    fields = Field.objects.filter(object=object)
    return fields

