from django.shortcuts import render

import logging

logger = logging.getLogger(__name__)

def newField(request, field_id):
    logger.info("User: " + request.user.username + " created new field: " + field_id)

def updateField(request, field_id):
    logger.info("User: " + request.user.username + " updated field: " + field_id)

def deleteField(request, field_id):
    logger.info("User: " + request.user.username + " deleted field: " + field_id)

def getField(request, field_id):
    logger.info("User: " + request.user.username + " got field: " + field_id)