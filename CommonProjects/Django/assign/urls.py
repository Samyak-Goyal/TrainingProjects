from . import views
from django.urls import URLPattern, path


urlpatterns=[
    path('home',views.SHomeView.as_view(),name='Shome_view'),

    path('<slug:slug>',views.StuView.as_view(),name='stu_view'),

]