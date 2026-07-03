from rest_framework import (
    viewsets,
    status
)

from rest_framework.response import (
    Response
)

from finance.models import (
    CustomerPayment
)

from finance.application.services import (
    CustomerPaymentService
)

from finance.infrastructure.serializers import (
    CustomerPaymentSerializer,
    CustomerPaymentCreateSerializer
)

from mdm.models import Customer

from core.models import Currency

from iam.models import UserProfile


class CustomerPaymentViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        CustomerPayment.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        CustomerPaymentSerializer
    )

    def get_serializer_class(
        self
    ):

        if self.action == 'create':

            return (
                CustomerPaymentCreateSerializer
            )

        return (
            CustomerPaymentSerializer
        )

    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        serializer = (
            CustomerPaymentCreateSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = (
            serializer.validated_data
        )

        profile = (
            UserProfile.objects.get(
                user=request.user
            )
        )

        customer = (
            Customer.objects.get(
                pk=data['customer']
            )
        )

        currency = (
            Currency.objects.get(
                pk=data['currency']
            )
        )

        payment = (
            CustomerPaymentService
            .create_payment(
                company=profile.company,

                customer=customer,

                currency=currency,

                payment_date=data[
                    'payment_date'
                ],

                amount=data[
                    'amount'
                ],

                created_by=request.user,

                allocations=data[
                    'allocations'
                ],

                reference=data.get(
                    'reference',
                    ''
                ),

                notes=data.get(
                    'notes',
                    ''
                )
            )
        )

        return Response(
            CustomerPaymentSerializer(
                payment
            ).data,
            status=status.HTTP_201_CREATED
        )