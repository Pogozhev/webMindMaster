from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render

import logging

logger = logging.getLogger(__name__)

def login_view(request):
    if request.GET:
        return render(request, 'account/login.html')
    else:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if (not user):
            context = {
                'error': "Error login or password"
            }
            logger.error("User :" + username + " try to login")
            return render(request, 'account/login.html', context)
        else:
            if user is not None:
                login(request,user)
                logger.info("User :" + username + " login")
                return HttpResponseRedirect('tree_list')
            else:
                logger.error("User :" + username + " try to login")
                return HttpResponseRedirect('login')


def logout_view(request):
    logout(request)
    logger.info("User :" + request.user.username + " login")
    return HttpResponseRedirect('tree_list')


def personal_profile(request):
    if request.method == "GET":
        first_name = request.user.first_name
        last_name = request.user.last_name
        email = request.user.email
        last_login = request.user.last_login
        context = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'last_login': last_login,
            'method': 'GET'
        }
        return render(request, 'account/personal_profile.html', context)

    if request.method == "POST":
        user = request.user
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']

        if (user.first_name != first_name):
            logger.info("User " + user.username + " changed: first name - from" + user.first_name + " to " + first_name)
        if (user.last_name != last_name):
            logger.info("User " + user.username + " changed: last name - from" + user.last_name + " to " + last_name)
        if (user.email != email):
            logger.info("User " + user.username + " changed: email - from" + user.email + " to " + email)

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        context = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'last_login': user.last_login,
            'method': 'POST'
        }
        return render(request, 'account/personal_profile.html', context)
    return HttpResponseRedirect('/tree_list/')