from rest_framework_nested import routers
from django.contrib import admin
from django.urls import path,include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_shema_view


schema_view = swagger_get_shema_view(
    openapi.Info(
        title="Sri Lankanism api docs",
        default_version='v1',
        description="Sri Lankanism api docs",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="srilankanism@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/schema/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
