# Generated by Django 4.1.7 on 2023-03-30 13:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app1", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="orderitems",
            name="unique_id",
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]