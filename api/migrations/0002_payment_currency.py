# Generated by Django 5.0.6 on 2024-06-15 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='currency',
            field=models.PositiveIntegerField(choices=[(1, 'Afg'), (2, 'Usd'), (3, 'Eru')], default=2),
        ),
    ]
