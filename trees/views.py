from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

from trees.models import Tree
from objects.models import Object
from fields.models import Field

# Create your views here.
def tree_list(request):
    tree_list = Tree.objects.all()
    template = loader.get_template('trees/tree_list.html')
    context1 = {
        'tree_list': tree_list,
    }
    return HttpResponse(template.render(context1, request))

def tree_workspace(request):
    tree = Tree.objects.filter(pk__in=request)
    objects = Object.objects.filter(tree=tree)

    template = loader.get_template('workspace/workspace.html')
    context = {
        'tree' : tree,
        'objects' : objects
    }
    return HttpResponse(template.render(context, request))