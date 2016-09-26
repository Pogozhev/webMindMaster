from django.db import models
# Create your models here.

# Здеся нам нужно писать свой код
# Класс, описывающий объект дерева
class Tree(models.Model):
    name = models.CharField(max_length = 255)
    create_date = models.DateTime()
    id_creator = models.ForeignKey(User) # ?????

    def __str__(self):
        return name;

# Класс, описывающий объект
class Object(models.Model):
    id_tree = models.ForeignKey(Tree)
    name = models.CharField(max_length = 255)
    address = models.CharField(max_length = 255)
    fields = models.DataSet(Field) # ????

    def __str__(self):
        return name;

# Класс, описывающий поле описания объекта
class Field(models.Field):
    name = models.CharField(max_length = 255)
    value = models.CharField(max_length = 255)

    def __str__(self):
        return name;
