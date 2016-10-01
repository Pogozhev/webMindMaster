from django.contrib import admin
from pizzamaker.models import Object, Field


class FieldInline(admin.TabularInline):
    model = Field


class ObjectAdmin(admin.ModelAdmin):
    inlines = [FieldInline]


admin.site.register(Object, ObjectAdmin)
admin.site.register(Field)

