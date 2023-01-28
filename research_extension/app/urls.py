from django.urls import path

from . import views
#from django.template.defaulttags import url
#from django.conf.urls import url
from django.urls import include, re_path

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^get_wiki_summary/$', views.get_wiki_summary, name='get_wiki_summary'),
]
