from . import views
from django.urls import path

urlpatterns=[
    path('',views.HomeView.as_view(),name='home_view'),
    path('about',views.AboutView.as_view(),name='about_view'),
    path('transfer',views.transfer_data,name='transfer_view'),

    path('<slug:slug>',views.BlogView.as_view(),name='blog_view'),


]
