from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonViewSet, PaymentViewSet
from .views import UserLoginView
from .views import ReportViewSet


router = DefaultRouter()
router.register(r"persons", PersonViewSet)
router.register(r"payments", PaymentViewSet)
router.register(r"reports", ReportViewSet, basename='reports')

urlpatterns = [
    path("", include(router.urls)),
    path("login/", UserLoginView.as_view(), name="login"),
]
