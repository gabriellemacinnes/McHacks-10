from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse, HttpResponse ####
from django.views.decorators.csrf import csrf_exempt

import wikipedia
import threading
from . import backend


def index(request):
    return HttpResponse("Hello, world. You're at the wiki index.")


most_recent_sum = ""


@csrf_exempt
def url_parse(request):
    if request.method == "POST":
        url = request.POST.get('url', False)
        raw_text = backend.get_text(url)
        print(raw_text)

        t = threading.Thread(target=update_summary, args=(raw_text,), daemon=True)
        t.start()
        to_return = {
            'url': url
        }
        return JsonResponse(to_return)
        #return HttpResponse(summary)
    return HttpResponse("Here is your most recent summary: " + most_recent_sum)


def update_summary(raw_text):
    global most_recent_sum
    summary = backend.create_summary(raw_text)
    print(summary)
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
