from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse, HttpResponse ####
from django.views.decorators.csrf import csrf_exempt

import wikipedia
from . import backend


def index(request):
    return HttpResponse("Hello, world. You're at the wiki index.")


@csrf_exempt
def url_parse(request):
    if request.method == "POST":
        url = request.POST.get('url', False)
        a = backend.get_text(url)
        print(a)
        b = backend.create_summary(a)
        print(b)
        to_return = {
            'url': url
        }
        #return JsonResponse(to_return)
        return HttpResponse(url)
    return HttpResponse("Hello, world. You're at the url_parser index.")


# https://pypi.org/project/wikipedia/#description
def get_wiki_summary(request):
    topic = request.GET.get('topic', None)

    print('topic:', topic)

    data = {
        'summary': wikipedia.summary(topic, sentences=1),
        'raw': 'Successful',
    }

    print('json-data to be sent: ', data)

    return JsonResponse(data)
