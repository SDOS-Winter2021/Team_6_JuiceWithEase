# Generated by Django 3.1.7 on 2021-05-03 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Feedback",
            fields=[
                ("username", models.CharField(max_length=200, null=True)),
                ("useremail", models.CharField(max_length=200, null=True)),
                ("subject", models.TextField(max_length=200, null=True)),
                ("message", models.TextField(null=True)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                (
                    "_id",
                    models.AutoField(editable=False, primary_key=True, serialize=False),
                ),
            ],
        ),
    ]
