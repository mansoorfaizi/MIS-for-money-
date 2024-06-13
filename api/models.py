from django.db import models

class Month(models.IntegerChoices):
    January = 1
    February = 2
    March = 3
    April = 4
    May = 5
    Jun = 6
    July = 7
    August = 8
    September = 9
    October = 10
    November = 11
    December = 12

class TransactionType(models.IntegerChoices):
    In = 1
    Out = 2

class Person(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
    
class Payment(models.Model):
    amount = models.IntegerField()
    type = models.PositiveIntegerField(choices=TransactionType.choices)
    person = models.ForeignKey(Person, on_delete = models.CASCADE)
    month = models.PositiveIntegerField(choices=Month.choices)
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.amount
    