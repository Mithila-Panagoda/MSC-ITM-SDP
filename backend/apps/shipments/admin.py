from django.contrib import admin

from .models import (
    Shipment,
    ShipmentUpdate
)

@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('id','tracking_id','customer','status','created_at','updated_at')
    search_fields = ('tracking_id','customer__email')
    list_filter = ('status','created_at')
    readonly_fields = ('tracking_id','created_at','updated_at')

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(ShipmentUpdate)
class ShipmentUpdateAdmin(admin.ModelAdmin):
    list_display = ('id','shipment','status','location','created_at')
    search_fields = ('shipment__tracking_id','location')
    list_filter = ('status','created_at')
    readonly_fields = ('created_at',)

    def has_change_permission(self, _request, _obj=None):
        return False
    
    def save_model(self, request, obj, form, change):
        try:
            obj.save()
        except ValueError as e:
            print(e)
            self.message_user(request, str(e), level='ERROR')
            obj.delete()