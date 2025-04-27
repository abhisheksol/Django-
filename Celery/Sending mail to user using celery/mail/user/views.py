from django.shortcuts import render, HttpResponse
from .tasks import test_func, send_mail_task

# Create your views here.
def send_mail_view(request):
    # test_func.delay()
    send_mail_task.delay()
    return HttpResponse("Mail sent successfully!")
