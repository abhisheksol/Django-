from celery import shared_task
from django.db import models
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
@shared_task(bind=True)
def test_func(self):
    for i in range(10):
        print(f"Task {self.request.id} is running... {i}")
    return "Task completed!"


@shared_task(bind=True)
def send_mail_task(self):
    user= get_user_model().objects.all()
    for u in user:
        
        message = "This is a test mail by abhishek using celery testing from django bacend "
        to_email= u.email
        send_mail(
            subject="Test mail",
            message=message,
            from_email= settings.EMAIL_HOST_USER,
            recipient_list=[to_email],
            fail_silently=False,

        )
    return "Mail sent successfully!"

