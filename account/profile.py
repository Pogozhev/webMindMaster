from django.contrib.auth import authenticate, login, logout
from django.forms import Form
from django.http import HttpResponse, request
from django.shortcuts import redirect, render_to_response, render
from django.template import RequestContext
from django.template import loader
from django.views.decorators.csrf import csrf_protect, requires_csrf_token, csrf_exempt

import logging

logger = logging.getLogger(__name__)

def login_view():
    template = loader.get_template('account/login.html')
    return render(request, "account/login.html")

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request,user)
        template = loader.get_template(request, 'trees/tree_list.html')
        form = Form(request.POST)
        logger.info("User :" + username + " login")
        return render_to_response('trees/tree_list.html', RequestContext(request, {'form' : form}))
    else:
        logger.error("User :" + username + " try to login")
        return redirect(request, 'account/login.html')


def logout_view(request):
    logout(request)
    template = loader.get_template('account/login.html')
    logger.info("User :" + request.user.username + " login")
    return HttpResponse(template.render())