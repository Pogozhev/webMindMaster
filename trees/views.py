from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader
from django.contrib.auth.models import User

from trees.models import Tree
from objects.models import Object
from fields.models import Field

from django.utils.translation import ugettext as _

# Create your views here.
def tree_list(request):
    if request.user.is_authenticated():
        tree_List = Tree.objects.all()
        jsonstr = tree2json(tree_List.first()) # Create string in JSON about tree and its objects with fields
        title = "Hello "+request.user.get_username()
        template = loader.get_template('trees/tree_list.html')
        context1 = {
            'tree_list': tree_List,
            'title': title,
            #'jsonstr': jsonstr
        }
        return HttpResponse(template.render(context1, request))
    else:
        template = loader.get_template('profile/login.html')
        return HttpResponse(template.render(request))


def tree2json(tree):
    string = "";
    string += '{ \r\n "Tree" : \r\n{ ' + '\r\n"name" : "' + tree.name + '", \r\n"user" : "' + tree.creator.username + '", \r\n"create_date": "' + str(tree.create_date)[0:19] + '" \r\n}, \r\n'
    string += '[ \r\n'
    objects = Object.objects.filter(tree=tree)
    for i in objects:
        string += '{ "Object" : \r\n{ ' + '\r\n"name" : "' + i.name + '", \r\n"address" : "' + i.address + '", \r\n"fields" : \r\n[ '
        fields = Field.objects.filter(object=i)
        for j in fields:
            string += ' { \r\n"Field" : \r\n{ ' + '\r\n"name" : "' + j.name + '", \r\n"value" : "' + j.value + '" \r\n}, \r\n},'
        string += ' \r\n], \r\n}'
    string += ' \r\n], \r\n}'
    return string


def workspace_update_tree(request):
    if request.user.is_authenticated():
        tree = Tree.objects.get(pk__in=request)
        objects = Object.objects.filter(tree=tree)
        fields = Field.object.field_set(object=objects)
        jsonstr = tree2json(tree) # Create string in JSON about tree and its objects with fields

        template = loader.get_template('workspace/workspace_update_tree.html')
        context = {
            'tree': tree,
            'objects': objects,
            'fields': fields
        }
        return HttpResponse(template.render(context, request))
    else:
        template = loader.get_template('profile/login.html')
        return HttpResponse(template.render(request))


def workspace_new_tree(request, tree_name):
    if request.user.is_authenticated():
        user = User.objects.get(username=request.user)  # how to get current user?
        tree = Tree.objects.create(name=tree_name, creator=user)
        object1 = Object.objects.create(name='root', tree=tree, address='1')
        object2 = Object.objects.create(name='object 2', tree=tree, address='1.1')
        field1 = Field.objects.create(name='field 1', value='value 1', object=object1)
        field2 = Field.objects.create(name='field 2', value='value 2', object=object2)
        jsonstr = tree2json(tree) # Create string in JSON about tree and its objects with fields

        objects = [object1, object2]
        fields = [field1, field2]

        template = loader.get_template('workspace/workspace_new_tree.html')
        context = {
        'tree': tree,
        'objects': objects,
        'fields': fields
        }
        return HttpResponse(template.render(context, request))
    else:
        template = loader.get_template('profile/login.html')
        return HttpResponse(template.render(request))


def delete_tree(request, tree_id):
    Tree.objects.filter(pk__in=tree_id).delete()
    template = loader.get_template('trees/tree_list.html')
    return HttpResponse(template.render(request))
