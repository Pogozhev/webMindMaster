from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader


def login_view():
    template = loader.get_template('profile/login.html')
    return HttpResponse(template.render())


def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    authenticate(username=username, password=password)
    return redirect(request, 'trees/tree_list.html')


def logout_view(request):
    logout(request)
    return redirect(request, 'profile/login.html')