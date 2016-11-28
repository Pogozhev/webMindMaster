from django.http import HttpResponse

import logging

logger = logging.getLogger(__name__)

def newField(request, field_id):
    logger.info("User: " + request.user.username + " created new field: " + field_id)
    return HttpResponse(request)

def updateField(request, field_id):
    logger.info("User: " + request.user.username + " updated field: " + field_id)
    return HttpResponse(request)

def deleteField(request, field_id):
    logger.info("User: " + request.user.username + " deleted field: " + field_id)
    return HttpResponse(request)

def getField(request, field_id):
    logger.info("User: " + request.user.username + " got field: " + field_id)
    return HttpResponse(request)