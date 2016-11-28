from django.contrib.auth import authenticate, login, logout
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