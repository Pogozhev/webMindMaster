from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

from trees.models import Tree


# Create your views here.
def tree_list(request):
    trees_list = Tree.objects.all()
    template = loader.get_template('trees/tree_list.html')
    context = {
        'trees_list': trees_list,
    }
    return HttpResponse(template.render(context, request))
