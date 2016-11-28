from django.http import HttpResponse
import logging

logger = logging.getLogger(__name__)

def newObject(request, object_id):
    logger.info("User: " + request.user.username + " created new object: " + object_id)
    return HttpResponse(request)

def updateObject(request, object_id):
    logger.info("User: " + request.user.username + " updated object: " + object_id)
    return HttpResponse(request)

def deleteObject(request, object_id):
    logger.info("User: " + request.user.username + " deleted object: " + object_id)
    return HttpResponse(request)

def getObject(request, object_id):
    logger.info("User: " + request.user.username + " got object: " + object_id)
    return HttpResponse(request)