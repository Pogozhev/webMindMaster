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
from django.conf.urls import url, include, i18n
from django.contrib import admin
from django.contrib.auth.views import login,logout
from trees import views as tree_views
from objects import views as object_views
from fields import views as field_views
from account import profile as account_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', tree_views.tree_list, name='tree_list'),
    url(r'^tree_list/', tree_views.tree_list, name='tree_list'),
    url(r'^login', account_views.login_view, name='login'),
    url(r'^logout', account_views.logout_view, name='logout'),
    url(r'^mindmapview/(?P<tree_id>[0-9]+)', tree_views.mindmapview, name='mindmapview'),
    url(r'^mindmap/(?P<tree_id>[0-9]+)', tree_views.mindmap, name='mindmap'),
    url(r'^savetree/(?P<tree_id>\rw+)', tree_views.savetree, name='savetree'),
    url(r'^ajaxExmpl/$', tree_views.ajaxExmpl),
    url(r'^i18n/', include('django.conf.urls.i18n')),

    url(r'^new_tree/(?P<tree_id>[0-9]+)', tree_views.newTree, name='new_tree'),
    url(r'^delete_tree/(?P<tree_id>[0-9]+)', tree_views.deleteTree, name='delete_tree'),
    url(r'^update_tree/(?P<tree_id>[0-9]+)', tree_views.updateTree, name='update_tree'),
    url(r'^get_tree/(?P<tree_id>[0-9]+)', tree_views.getTree, name='get_tree'),

    url(r'^new_object/(?P<object_id>[0-9]+)', object_views.newObject, name='new_object'),
    url(r'^delete_object/(?P<object_id>[0-9]+)', object_views.deleteObject, name='delete_object'),
    url(r'^update_object/(?P<object_id>[0-9]+)', object_views.updateObject, name='update_object'),
    url(r'^get_object/(?P<object_id>[0-9]+)', object_views.getObject, name='get_object'),

    url(r'^new_field/(?P<field_id>[0-9]+)', field_views.newField, name='new_field'),
    url(r'^delete_field/(?P<field_id>[0-9]+)', field_views.deleteField, name='delete_field'),
    url(r'^update_field/(?P<field_id>[0-9]+)', field_views.updateField, name='update_field'),
    url(r'^get_field/(?P<field_id>[0-9]+)', field_views.getField, name='get_field'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
