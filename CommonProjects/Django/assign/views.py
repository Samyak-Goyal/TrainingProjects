from django.shortcuts import render
from .models import Student
from django.views import generic
# Create your views here.

class StuView(generic.DetailView):
    model=Student
    template_name='student.html' 

class SHomeView(generic.ListView):
    queryset=Student.objects.all()
    template_name='sindex.html'  