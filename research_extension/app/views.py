from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse, HttpResponse ####
from django.views.decorators.csrf import csrf_exempt

import wikipedia
import threading
from itertools import count
from . import backend


def index(request):
    return HttpResponse("Hello, world. You're at the wiki index.")


class Summarizer:
    iterator = (count(start=0, step=1))

    def __init__(self):
        self.id = next(Summarizer.iterator)
        self.is_done = False


most_recent_sum = ""
url = ""

dict = {}
iterator = (count(start=0, step=1))


@csrf_exempt
def url_parse(request):
    if request.method == "POST":
        global url
        url = request.POST.get('url', False)
        raw_text = backend.get_text(url)
        print(raw_text)

        id = next(iterator)
        dict[id] = False
        t = threading.Thread(target=update_summary, args=(raw_text, id), daemon=True)
        t.start()
        return HttpResponse(id)
        #return JsonResponse({'id': id})
    return HttpResponse("Here is your most recent summary: <br>" + most_recent_sum + "<br>Source: " + url)


def check_sum(request,id):
    state = dict[id]
    return HttpResponse(state)
    #return JsonResponse({'is_done': state})


def update_summary(raw_text, id):
    state = dict[id]
    global most_recent_sum
    summary = backend.create_summary(raw_text)
    print(summary)
    dict[id] = True
    most_recent_sum = summary


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
