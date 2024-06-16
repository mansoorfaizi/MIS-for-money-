from .serializers import Person, Payment, PersonSerializer, PaymentSerializer
from rest_framework import viewsets, permissions, response
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from .models import TransactionType
from django.db.models import Sum
from django_filters.rest_framework import DjangoFilterBackend


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [permissions.IsAdminUser]


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    # permission_classes = [permissions.IsAdminUser]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["type", "person", "month", "year", "currency"]


class UserLoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return super(UserLoginView, self).post(request, format=None)
    

class ReportViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser]

    def list(self, request):
        total_money_in_afg = Payment.objects.filter(type=TransactionType.In, currency=1).aggregate(total=Sum('amount'))['total'] or 0        
        total_money_out_afg = Payment.objects.filter(type=TransactionType.Out, currency=1).aggregate(total=Sum('amount'))['total'] or 0

        total_money_in_usd = Payment.objects.filter(type=TransactionType.In, currency=2).aggregate(total=Sum('amount'))['total'] or 0        
        total_money_out_usd = Payment.objects.filter(type=TransactionType.Out, currency=2).aggregate(total=Sum('amount'))['total'] or 0

        total_money_in_eru = Payment.objects.filter(type=TransactionType.In, currency=3).aggregate(total=Sum('amount'))['total'] or 0        
        total_money_out_eru = Payment.objects.filter(type=TransactionType.Out, currency=3).aggregate(total=Sum('amount'))['total'] or 0


        total_available_money_afg = total_money_in_afg - total_money_out_afg
        total_available_money_usd = total_money_in_usd - total_money_out_usd
        total_available_money_eru = total_money_in_eru - total_money_out_eru
        return response.Response(
            {
                "totalMoneyInAfg": total_money_in_afg,
                "   ": total_money_out_afg,
                "totalMoneyAvailableAfg": total_available_money_afg,

                "totalMoneyInUsd": total_money_in_usd,
                "totalMoneyOutUsd": total_money_out_usd,
                "totalMoneyAvailableUsd": total_available_money_usd,

                "totalMoneyInEru": total_money_in_eru,
                "totalMoneyOutEru": total_money_out_eru,
                "totalMoneyAvailableEru": total_available_money_eru,
            }
        )