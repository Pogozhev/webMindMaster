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
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
    return redirect(request, 'trees/tree_list.html')


def logout_view(request):
    logout(request)