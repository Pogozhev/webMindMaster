
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Tree(models.Model):
    name = models.CharField(max_length=255, default="New tree")
    file = models.CharField(max_length=1000000, default="")
    create_date = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User)
    def __str__(self):
        return '{}, {:%Y-%m-%d}, {}'.format(self.name, self.create_date, self.user)