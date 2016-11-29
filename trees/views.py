import json
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from trees.models import Tree
import logging
from django.utils.translation import ugettext_lazy as _

logger = logging.getLogger(__name__)

# Create your views here.

@login_required
def tree_list(request):
    tree_List = Tree.objects.filter(user=request.user)
    title = _("Hello, ") + request.user.get_username()
    context1 = {
        'tree_list': tree_List,
        'title': title,
    }
    logger.info("User: " + request.user.username + " got trees")
    #return render(request, 'webmindmaster/index.html', context1)
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


@csrf_exempt
def savetree(request, tree_id):
    tree = get_object_or_404(Tree, pk=tree_id)
    tree.file = request.body
    tree.save();
    return HttpResponse(request)


def ajaxExmpl(request):
    r = {}
    r['post_text'] = request.POST.get('the_post') + ' example txet from back end'
    return HttpResponse(json.dumps(r), content_type="application/json")

def newTree(request, tree_id):
    logger.info("User: " + request.user.username + " created new tree: " + tree_id)
    return HttpResponse(request)

def updateTree(request, tree_id):
    logger.info("User: " + request.user.username + " updated tree: " + tree_id)
    return HttpResponse(request)

def deleteTree(request, tree_id):
    logger.info("User: " + request.user.username + " deleted tree: " + tree_id)
    return HttpResponse(request)

def getTree(request, tree_id):
    logger.info("User: " + request.user.username + " got tree: " + tree_id)
    return HttpResponse(request)

