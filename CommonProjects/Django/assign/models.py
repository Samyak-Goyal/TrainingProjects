from django.db import models
# Create your models here.


class Student(models.Model):
    name=models.CharField(max_length=200)
    grade=models.IntegerField()
    dob=models.DateTimeField()
    age=models.IntegerField()
    slug=models.SlugField(max_length=200,unique=True)

    def __str__(self):
        return self.name