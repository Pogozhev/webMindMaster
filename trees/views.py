from trees.models import Tree
from django.views.generic import ListView

class TreeListView(ListView):
    model = Tree;