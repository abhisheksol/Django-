from django.shortcuts import render, HttpResponse as httpResponse

# Create your views here.
def index(request):
    # return httpResponse("Hello, world. You're at the polls index.")
    context={
        "variable": "hello abhishek"
    }
    return render(request, 'index.html', context)

def contact(request):
    return httpResponse("contact.")

def about(request):
    return httpResponse("about page.")

def help(request):
    return httpResponse("help page")