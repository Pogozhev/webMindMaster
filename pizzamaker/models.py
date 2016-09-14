from django.db import models
# Create your models here.
# Это просто примеры работы
import datetime
from django.utils import timezone

class Question(models.Model):
   question_text = models.CharField(max_length=200)
   pub_date = models.DateTimeField('date published')

   def __str__(self):
       return self.question_text

   def was_puplished_recently(self):
       now = timezone.now()
       return now - datetime.timedelta(days=1) <= self.pub_date <= now

   was_puplished_recently.admin_order_field = 'pub_date'
   was_puplished_recently.boolean = True
   was_puplished_recently.short_description = 'Published recently?'

class Choice(models.Model):
   question = models.ForeignKey(Question)
   choice_test = models.CharField(max_length=200)
   votes = models.IntegerField(default=0)

   def __str__(self):
       return self.choice_test


# Здеся нам нужно писать свой код
# Класс, описывающий объект дерева: имеет идентификатор, название
class Tree():
    def __init__(self, id, name):
        self.id = id;
        self.name = name;

    def get(self):
        return self;


# Класс, описывающий объект узла
class Node():
    def __init__(self, id, name, information, id_tree, id_parent_node):
        self.id = id;
        self.name = name;
        self.information = information;
        self.id_tree = id_tree;
        self.id_parent_node = id_parent_node;

    def get(self):
        return self;

# Класс управления, в котором описаны функции работы с базой данных: Создание нового дерева, Получение деревьев, Удаление дерева, Изменение дерева
class ManageTrees:
    # Тут пока зашлушки методов. Их имеет смысл писать, когда будет готова база данных, и будет известно с чем мы работаем
    def CreateTree(self):
        return self;

    def GetTree(self):
        return self;

    def RemoveTree(self):
        return self;

    def UpdateTree(self):
        return self;