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
from account import profile as account_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', tree_views.tree_list, name='tree_list'),
    url(r'^tree_list/', tree_views.tree_list, name='tree_list'),
    url(r'^about/', tree_views.about_view,   name='about'),

    url(r'^login', account_views.login_view, name='login'),
    url(r'^logout', account_views.logout_view, name='logout'),
    url(r'^personal_profile', account_views.personal_profile, name='personal_profile'),

    url(r'^mindmapview/(?P<tree_id>[0-9]+)', tree_views.mindmapview, name='mindmapview'),
    url(r'^mindmap/(?P<tree_id>[0-9]+)', tree_views.mindmap, name='mindmap'),
    url(r'^savetree/(?P<tree_id>[0-9]+)', tree_views.savetree, name='savetree'),
    url(r'^createtree/', tree_views.create_tree, name='createtree'),
    url(r'^renametree/(?P<tree_id>[0-9]+)', tree_views.rename_tree, name='renametree'),
    url(r'^deletetree/(?P<tree_id>[0-9]+)', tree_views.delete_tree, name='deletetree'),

    url(r'^i18n/', include('django.conf.urls.i18n')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
