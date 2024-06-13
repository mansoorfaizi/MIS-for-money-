from django.contrib import admin
from .models import Person, Payment

class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'amount', 'type', 'person', 'month']


class PersonAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

admin.site.register(Person, PersonAdmin)
admin.site.register(Payment, PaymentAdmin)