"""kursach URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from trees import views as tree_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', tree_views.tree_list, name='tree_list'),
    url(r'^workspace/(?P<tree_name>\w+)', tree_views.workspace_new_tree, name='workspace_new_tree'),
   # url(r'^workspace/(?P<tree_id>[0-9]+)', tree_views.workspace_update_tree, name='workspace_update_tree')
]
