# Generated by Django 3.1.7 on 2021-05-03 21:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_auto_20210504_0220"),
    ]

    operations = [
        migrations.RenameField(
            model_name="product",
            old_name="_id",
            new_name="id",
        ),
    ]
