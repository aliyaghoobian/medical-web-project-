# Generated by Django 3.1.1 on 2020-09-03 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='register_type',
            field=models.CharField(choices=[('app_register', 'app register'), ('web_register', 'web register')], default='web_register', max_length=16),
        ),
    ]
