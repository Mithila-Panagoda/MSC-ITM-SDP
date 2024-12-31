from django.contrib import admin

from .models import (
    Shipment,
    ShipmentUpdate,
    Reschedule,
    Notification,
    NotificationMessage
)

@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('tracking_id','customer','status','created_at','updated_at')
    search_fields = ('tracking_id','customer__email')
    list_filter = ('status','created_at')
    readonly_fields = ('tracking_id','created_at','updated_at')

    # def has_add_permission(self, request):
    #     return False

    def has_change_permission(self, request, obj=None):
        return False

    # def has_delete_permission(self, request, obj=None):
    #     return False

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
            
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.order_by('-created_at')
            
            
@admin.register(Reschedule)  
class RescheduleAdmin(admin.ModelAdmin):
    list_display = ('id','shipment','new_delivery_date','status')
    search_fields = ('shipment__tracking_id','new_delivery_date')
    list_filter = ('status','new_delivery_date')
    readonly_fields = ('created_at','custom_instructions','new_delivery_date')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.order_by('-created_at')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id','shipment','send_email','send_sms','send_push_notification')
    search_fields = ('shipment__tracking_id','send_email','send_sms','send_push_notification')
    list_filter = ('send_email','send_sms','send_push_notification')
    readonly_fields = ('created_at','updated_at')

    def get_inline_instances(self, request, obj=None):
        inline_instances = []
        if obj is not None:
            inline_instance = NotificationMessageInline(self.model, self.admin_site)
            inline_instances.append(inline_instance)
        return inline_instances

class NotificationMessageInline(admin.TabularInline):
    model = NotificationMessage
    extra = 0
    readonly_fields = ('email_status','sms_status','push_notification_status','message', 'created_at','email_sent_at','sms_sent_at','push_notification_sent_at')