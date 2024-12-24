from rest_framework_nested import routers

from .views import(
    ShipmentViewSet
)

router = routers.SimpleRouter()
router.register('shipments', ShipmentViewSet,basename='shipments')

urlpatterns = router.urls