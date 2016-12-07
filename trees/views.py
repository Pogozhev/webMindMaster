import json

from django.http import HttpResponseRedirect
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt, csrf_protect


from trees.models import Tree
import logging
from django.utils.translation import ugettext_lazy as _

logger = logging.getLogger(__name__)

@login_required
def tree_list(request):
    tree_List = Tree.objects.filter(user=request.user)
    title = _("Hello, ") + request.user.get_username()
    context1 = {
        'tree_list': tree_List,
        'title': title,
    }
    logger.info("User: " + request.user.username + " got trees")
    return render(request, 'trees/tree_list.html', context1)


def mindmap(request, tree_id):
    tree = get_object_or_404(Tree, pk=tree_id)
    return HttpResponse(tree.file, content_type='application/json')


def mindmapview(request, tree_id):
    tree = get_object_or_404(Tree, pk=tree_id)
    context = {
        'tree': tree,
    }
    return render(request, 'webmindmaster/index.html', context)


def create_tree(request):
    tree = Tree(user=request.user)
    tree.save()
    context = {
        'tree': tree,
    }
    logger.info("User: " + request.user.username + " created new tree: " + str(tree.id))
    return render(request, 'webmindmaster/index.html', context)


def rename_tree(request, tree_id):
    tree = get_object_or_404(Tree, pk=tree_id)
    tree.name = request.POST.get('new_tree_name')
    tree.save()
    return HttpResponse(request)


def delete_tree(request, tree_id):
    tree = get_object_or_404(Tree, pk=tree_id)
    logger.info("User: " + request.user.username + " deleted tree: " + str(tree.id))
    tree.delete()
    return HttpResponse(request)


@csrf_exempt
def savetree(request, tree_id):
    tree = get_object_or_404(Tree, pk=tree_id)
    tree.file = request.body
    tree.save();
    logger.info("User: " + request.user.username + " updated tree: " + str(tree.id))
    return HttpResponse(request)


