from rest_framework_nested import routers

from .views import(
    ShipmentViewSet,
    RescheduleViewSet,
    NotificationViewSet
)

router = routers.SimpleRouter()
router.register('shipments', ShipmentViewSet,basename='shipments')
shipment_nested_router = routers.NestedSimpleRouter(router, r'shipments', lookup='shipment')
shipment_nested_router.register(r'reschedules', RescheduleViewSet, basename='shipment-reschedules')
shipment_nested_router.register(r'notifications', NotificationViewSet, basename='shipment-notifications')
urlpatterns = router.urls + shipment_nested_router.urls