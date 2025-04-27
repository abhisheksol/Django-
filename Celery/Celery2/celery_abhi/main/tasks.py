from celery import shared_task

@shared_task(bind=True)
def test_func(self):
    for i in range(10):
        print(f"Task {self.request.id} is running... {i}")
    return "Task completed!"