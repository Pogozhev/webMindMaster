from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from trees.models import Tree

class TreeTestCase(TestCase):
    def setUp(self):
        Tree.objects.create()

