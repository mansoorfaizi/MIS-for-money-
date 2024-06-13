from .serializers import Person, Payment, PersonSerializer, PaymentSerializer
from rest_framework import viewsets, permissions, response
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from .models import TransactionType
from django.db.models import Sum


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [permissions.IsAdminUser]


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAdminUser]


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
        total_money_in = Payment.objects.filter(type=TransactionType.In).aggregate(total=Sum('amount'))['total'] or 0        
        total_money_out = Payment.objects.filter(type=TransactionType.Out).aggregate(total=Sum('amount'))['total'] or 0
        total_available_money = total_money_in - total_money_out
        return response.Response(
            {
                "totalMoneyIn": total_money_in,
                "totalMoneyOut": total_money_out,
                "totalAvailableMoney": total_available_money,
            }
        )