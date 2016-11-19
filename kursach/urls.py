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
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import login,logout
from trees import views as tree_views
from objects import views as object_views
from fields import views as field_views

urlpatterns = [
    url(r'^workspace/(?P<tree_name>\w+)', tree_views.workspace_new_tree, name='workspace_new_tree'),
    url(r'^workspace/(?P<tree_id>[0-9]+)', tree_views.workspace_update_tree, name='workspace_update_tree'),

    url(r'^admin/', admin.site.urls),
    url(r'^$', tree_views.tree_list, name='tree_list'),
    url(r'^account/login/$', login, name='login'),
    url(r'^account/logout/$', logout, name='logout'),

    url(r'^new_tree/(?P<tree_id>[0-9]+)', tree_views.newTree, name='new_tree'),
    url(r'^delete_tree/(?P<tree_id>[0-9]+)', tree_views.deleteTree, name='delete_tree'),
    url(r'^update_tree/(?P<tree_id>[0-9]+)', tree_views.updateTree, name='update_tree'),
    url(r'^get_tree/(?P<tree_id>[0-9]+)', tree_views.getTree, name='get_tree'),

    url(r'^new_object/(?P<tree_id>[0-9]+)', object_views.newObject, name='new_object'),
    url(r'^delete_object/(?P<tree_id>[0-9]+)', object_views.deleteObject, name='delete_object'),
    url(r'^update_object/(?P<tree_id>[0-9]+)', object_views.updateObject, name='update_object'),
    url(r'^get_object/(?P<tree_id>[0-9]+)', object_views.getObject, name='get_object'),

    url(r'^new_field/(?P<tree_id>[0-9]+)', field_views.newField, name='new_field'),
    url(r'^delete_field/(?P<tree_id>[0-9]+)', field_views.deleteField, name='delete_field'),
    url(r'^update_field/(?P<tree_id>[0-9]+)', field_views.updateField, name='update_field'),
    url(r'^get_field/(?P<tree_id>[0-9]+)', field_views.getField, name='get_field'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
