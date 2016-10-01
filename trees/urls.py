from django.conf.urls import url

from trees.views import TreeListView

urlpatterns = [
    url('^$', TreeListView.as_view(), name='tree_list')
]
