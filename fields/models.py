from django.db import models
from objects.models import Object


class Field(models.Model):
    name = models.CharField(max_length = 255)
    value = models.CharField(max_length = 255)
    object = models.ForeignKey(Object)

    def __str__(self):
        return self.name

    def dump(self):
        """
        Функция представления объекта в JSON
        """
        return '{ "Object" : "' + self.object.dump() + '", ' + '"Property" : "' + self.name + '", "Value" : "' + self.value + '" }'

class FieldManager(models.Manager):
    """
    Управляющий класс модели, имеет методы:
    1) создание поля к объекту
    """
    def create_field(self,name,value,object):
        field = self.create(name=name, value=value, object=object)


def getFields(object):
    fields = Field.objects.filter(object=object)
    return fields
