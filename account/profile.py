from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import redirect, render_to_response
from django.template import loader


def login_view():
    template = loader.get_template('account/login.html')
    return HttpResponse(template.render())


def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request,user)
        template = loader.get_template(request, 'trees/tree_list.html')
        return HttpResponse(template.render())
    else:
        return redirect(request, 'account/login.html')


def logout_view(request):
    logout(request)
    template = loader.get_template('account/login.html')
    return HttpResponse(template.render())