from rest_framework import (
    viewsets,
    status
)

from rest_framework.response import (
    Response
)

from finance.models import (
    SupplierPayment
)

from finance.application.services import (
    SupplierPaymentService
)

from finance.infrastructure.serializers import (
    SupplierPaymentSerializer,
    SupplierPaymentCreateSerializer
)

from mdm.models import (
    Supplier
)

from core.models import (
    Currency
)

from treasury.models import (
    BankAccount
)

from iam.models import (
    UserProfile
)


class SupplierPaymentViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        SupplierPayment.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        SupplierPaymentSerializer
    )

    def get_serializer_class(
        self
    ):

        if self.action == 'create':

            return (
                SupplierPaymentCreateSerializer
            )

        return (
            SupplierPaymentSerializer
        )

    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        serializer = (
            SupplierPaymentCreateSerializer(
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

        supplier = (
            Supplier.objects.get(
                pk=data['supplier']
            )
        )

        currency = (
            Currency.objects.get(
                pk=data['currency']
            )
        )

        bank_account = None

        if data.get(
            'bank_account'
        ):

            bank_account = (
                BankAccount.objects.get(
                    pk=data[
                        'bank_account'
                    ]
                )
            )

        payment = (
            SupplierPaymentService
            .create_payment(
                company=profile.company,

                supplier=supplier,

                currency=currency,

                bank_account=bank_account,

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
            SupplierPaymentSerializer(
                payment
            ).data,
            status=status.HTTP_201_CREATED
        )