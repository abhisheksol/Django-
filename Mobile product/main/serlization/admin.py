from django.contrib import admin

# Register your models here.

from .models import Mobile
class MobileAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'price', 'ram', 'storage', 'camera', 'battery', 'processor')
    search_fields = ('name', 'brand')
    list_filter = ('brand',)    
admin.site.register(Mobile, MobileAdmin)