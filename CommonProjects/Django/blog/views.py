from django.shortcuts import render
from .models import Post
from django.views import generic
# Create your views here.

class BlogView(generic.DetailView):
    model=Post
    template_name='blog.html' 

class HomeView(generic.ListView):
    queryset=Post.objects.filter(status=1)
    template_name='index.html'    

class AboutView(generic.TemplateView):
    template_name='about.html'        

def transfer_data(request):
    if request.method=='Post':
        return True
    return render(request,'transfer.html')    