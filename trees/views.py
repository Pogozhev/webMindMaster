#from django.core.serializers import json
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader
from django.contrib.auth.models import User
from django.core import serializers
from rest_framework.renderers import JSONRenderer
import json as simplejson

from fields.serializers import FieldSerializer
from objects.serializers import ObjectSerializer
from trees.models import Tree
from objects.models import Object
from fields.models import Field
import logging

logger = logging.getLogger(__name__)

# Create your views here.
from trees.serializers import TreeSerializer


def tree_list(request):
    if request.user.is_authenticated():
        tree_List = Tree.objects.all()
        tree2json_exmpl="";
        json2tree_exmpl = "";
        #tree2json_exmpl = tree2json(2)
        #for jsonStr in tree2json_exmpl:
         #   json2tree_exmpl += json2tree(jsonStr)
        #json2tree_exmpl = json2tree(tree2json_exmpl)

        #if (tree_List.count()!=0):
        #    jsonstr = tree2json(tree_List.first()) # Create string in JSON about tree and its objects with fields

        title = "Hello, " + request.user.get_username()
        template = loader.get_template('webmindmaster/index.html')
        context1 = {
            'tree_list': tree_List,
            'title': title,
            'jsonSer': tree2json_exmpl,
            'jsonDeSer': json2tree_exmpl,
        }
        logger.info("User: " + request.user.username + " got trees")
        return HttpResponse(template.render(context1, request))
    else:
        template = loader.get_template('account/login.html')
        return HttpResponse(template.render(request))
#xmlHttpsRequest ajax

def newTree(request, tree_id):
    logger.info("User: " + request.user.username + " created new tree: " + tree_id)

def updateTree(request, tree_id):
    logger.info("User: " + request.user.username + " updated tree: " + tree_id)

def deleteTree(request, tree_id):
    logger.info("User: " + request.user.username + " deleted tree: " + tree_id)

def getTree(request, tree_id):
    logger.info("User: " + request.user.username + " got tree: " + tree_id)

"""
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
"""

def tree2json(tree_id):
    data_fields_json = "";
    data_objects_json="";

    tree = Tree.objects.all()
    data_trees_json=""
    data_objects_json=""
    data_fields_json=""
    string=""

    data_trees_json = serializers.serialize("json", tree)
    object = Object.objects.filter(tree=tree)
    data_objects_json += serializers.serialize('json', object)
    for obj in object:
        field = Field.objects.filter(object=obj)
        data_fields_json += serializers.serialize('json', field)
    '''
    string = ""
    string = tree_json = simplejson.dump(tree)
    json_tree = simplejson.loads(tree_json)
    string = "\n" + json_tree.name'''

    string_tree = str(data_trees_json)
    string_object = str(data_objects_json)
    string_field = str(data_fields_json)

    data_in_json = {
        'tree': data_trees_json,
        'objects': data_objects_json,
        'fields': data_fields_json
    }
    return (string_tree, string_object, string_field)


def json2tree(jsondata):
    objects = serializers.deserialize("json", jsondata)
    string = "";
    for obj in objects:
        string += str(obj)
    return string


def tree2jsonREST(tree_id):
    #tree = Tree.objects.filter(pk=tree_id)
    tree = Tree.objects.first()
    tree_serializer_data = TreeSerializer(tree).data
    objects = Object.objects.filter(tree=tree)
    objects_serializer_data = ObjectSerializer(objects)
    field = Field.objects.filter(object=objects)
    field_serializer_data = FieldSerializer(field)

    data_in_json = {
        'tree': tree_serializer_data,
        'objects': objects_serializer_data,
        'fields': field_serializer_data
    }
    return data_in_json


def workspace_update_tree(request, tree_id):
    if request.user.is_authenticated():
        tree = Tree.objects.get(pk=request)
        objects = Object.objects.filter(tree=tree)
        fields = Field.objects.filter(object=objects)
        #jsonstr = tree2json(tree) # Create string in JSON about tree and its objects with fields

        template = loader.get_template('workspace/workspace.html')
        context = {
            'tree': tree,
            'objects': objects,
            'fields': fields
        }
        return HttpResponse(template.render(context, request))
    else:
        template = loader.get_template('account/login.html')
        return HttpResponse(template.render(request))


def workspace_new_tree(request, tree_name):
    if request.user.is_authenticated():
        user = User.objects.get(username=request.user)  # how to get current user?
        tree = Tree.objects.create(name=tree_name, creator=user)
        object1 = Object.objects.create(name='root', tree=tree, address='1')
        object2 = Object.objects.create(name='object 2', tree=tree, address='1.1')
        field1 = Field.objects.create(name='field 1', value='value 1', object=object1)
        field2 = Field.objects.create(name='field 2', value='value 2', object=object2)
        #jsonstr = tree2json(tree) # Create string in JSON about tree and its objects with fields

        objects = [object1, object2]
        fields = [field1, field2]

        template = loader.get_template('workspace/workspace.html')
        context = {
        'tree': tree,
        'objects': objects,
        'fields': fields
        }
        return HttpResponse(template.render(context, request))
    else:
        template = loader.get_template('account/login.html')
        return HttpResponse(template.render(request))


def delete_tree(request, tree_id):
    Tree.objects.filter(pk__in=tree_id).delete()
    template = loader.get_template('trees/tree_list.html')
    return HttpResponse(template.render(request))

