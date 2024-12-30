# Generated by Django 4.2 on 2024-12-30 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipments', '0002_reschedule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reschedule',
            name='status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('ACCEPTED', 'Accepted'), ('REJECTED', 'Rejected')], default='PENDING', max_length=20),
        ),
    ]