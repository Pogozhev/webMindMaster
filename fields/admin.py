from django.contrib import admin
from fields.models import Field

# Register your models here.
class FieldInline(admin.TabularInline):
    model = Field


class ObjectAdmin(admin.ModelAdmin):
    inlines = [FieldInline]

admin.site.register(Field)