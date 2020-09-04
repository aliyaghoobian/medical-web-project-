# Generated by Django 3.1.1 on 2020-09-03 16:04
from django.contrib.auth.management import create_permissions
from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType
from django.db import migrations
from django.db import transaction


# def create_groups(apps, schema_editor):
#     db_alias = schema_editor.connection.alias
#     with transaction.atomic():
#
#         Group = apps.get_model("auth", "Group")
#         Group.objects.using(db_alias).bulk_create(
#             [Group(name="doctor"), Group(name="patient")]
#         )
#         content_type = ContentType.objects.get(app_label='image_management', model='image')  # I chose user model but you can edit it
#         permission = Permission(
#             name='Your permission description',
#             codename='image',
#             content_type=content_type,
#         )
#         permission.save()
#         add_image = Permission.objects.get(codename='add_image')
#         change_image = Permission.objects.get(codename='change_image')
#         delete_image = Permission.objects.get(codename='delete_image')
#         view_image = Permission.objects.get(codename='view_image')
#
#         doctor_group = Group.objects.using(db_alias).get(name="doctor")
#         patient_group = Group.objects.using(db_alias).get(name="patient")
#         doctor_group.permissions.add(add_image)
#         doctor_group.permissions.add(change_image)
#         doctor_group.permissions.add(delete_image)
#         doctor_group.permissions.add(change_image)
#         patient_group.permissions.add(view_image)
#
#         patient_group.save()
#         doctor_group.save()

def create_image_permissions(apps, schema_editor):
    app_config = apps.get_app_config('image_management')
    app_config.models_module = True
    create_permissions(app_config, verbosity=0)
    app_config.models_module = None


def create_doctor_group(apps, schema_editor):
    Group.objects.create(name='doctor')
    # get_or_create returns a tuple, not a Group
    group = Group.objects.get(name='doctor')
    permissions = Permission.objects.filter(codename__in=[
         'add_image',
    ])
    group.permissions.add(*permissions)


def create_patient_group(apps, schema_editor):
    Group.objects.create(name='patient')
    # get_or_create returns a tuple, not a Group
    group = Group.objects.get(name='patient')
    permissions = Permission.objects.filter(codename__in=[
         'add_image',
    ])
    group.permissions.add(*permissions)


def delete_groups(apps, schema_editor):
    with transaction.atomic():
        Group = apps.get_model("auth", "Group")
        Group.objects.delete()


class Migration(migrations.Migration):
    dependencies = [
        ('image_management', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_image_permissions, reverse_code=migrations.RunPython.noop),
        migrations.RunPython(create_doctor_group, reverse_code=migrations.RunPython.noop),
        migrations.RunPython(create_patient_group, reverse_code=migrations.RunPython.noop),
    ]