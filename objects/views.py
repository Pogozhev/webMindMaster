from django.shortcuts import render
import logging

logger = logging.getLogger(__name__)

def newObject(request, object_id):
    logger.info("User: " + request.user.username + " created new object: " + object_id)

def updateObject(request, object_id):
    logger.info("User: " + request.user.username + " updated object: " + object_id)

def deleteObject(request, object_id):
    logger.info("User: " + request.user.username + " deleted object: " + object_id)

def getObject(request, object_id):
    logger.info("User: " + request.user.username + " got object: " + object_id)