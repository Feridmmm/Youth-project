from django.shortcuts import redirect

def index(request):
    return redirect('http://localhost:5173/')  # Change to your frontend URL
