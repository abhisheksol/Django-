from django.shortcuts import render
from django.http import HttpResponse
from .tasks import test_func
# Create your views here.
def tasks(request):
    # Call the Celery task
    test_func.delay()  # Call the task asynchronously
    return HttpResponse("Hello, this is a test view!")