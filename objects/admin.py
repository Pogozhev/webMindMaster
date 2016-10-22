from django.contrib import admin

# Register your models here.
from fields.admin import FieldInline
from objects.models import Object


class ObjectAdmin(admin.ModelAdmin):
    inlines = [FieldInline]

admin.site.register(Object, ObjectAdmin)