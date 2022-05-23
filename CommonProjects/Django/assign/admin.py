from django.contrib import admin
from .models import Student
# Register your models here.

class AssignAdmin(admin.ModelAdmin):
    list_display=('name','grade','age')
admin.site.register(Student,AssignAdmin)