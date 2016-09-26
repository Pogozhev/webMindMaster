from django.contrib import admin

from pizzamaker.models import Tree, Object, Field


class FieldInline(admin.TabularInline):
    model = Field


class ObjectAdmin(admin.ModelAdmin):
    inlines = [FieldInline]


admin.site.register(Tree)
admin.site.register(Object, ObjectAdmin)
admin.site.register(Field)