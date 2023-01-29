from django.urls import path

from . import views
from django.urls import include, re_path

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^get_wiki_summary/$', views.get_wiki_summary, name='get_wiki_summary'),
    path('url_parse', views.url_parse, name='url_parse'),
    path('check_sum/<int:id>/', views.check_sum, name='check_sum')
]
