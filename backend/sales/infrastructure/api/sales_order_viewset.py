from rest_framework import (
    viewsets,
    status
)

from rest_framework.response import (
    Response
)

from sales.models import (
    SalesOrder
)
from rest_framework.decorators import (
    action
)

from sales.application.services import (
    SalesOrderService,
    SalesOrderApprovalService,
    SalesOrderReopenService,
    SalesOrderUpdateService
)

from sales.infrastructure.serializers import (
    SalesOrderSerializer,
    SalesOrderCreateSerializer,
    SalesOrderUpdateSerializer
)

from mdm.models import (
    Customer
)

from core.models import (
    Currency
)

from iam.models import (
    UserProfile
)


class SalesOrderViewSet(
    viewsets.ModelViewSet
):

    @action(
        detail=True,
        methods=['post']
    )
    def approve(
        self,
        request,
        pk=None
    ):

        order = self.get_object()

        order = (
            SalesOrderApprovalService
            .approve_order(
                order
            )
        )

        return Response(
            SalesOrderSerializer(
                order
            ).data
        )

    queryset = (
        SalesOrder.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        SalesOrderSerializer
    )

    @action(
        detail=True,
        methods=['post']
    )
    def reopen(
        self,
        request,
        pk=None
    ):

        order = self.get_object()

        order = (
            SalesOrderReopenService
            .reopen_order(
                order
            )
        )

        return Response(
            SalesOrderSerializer(
                order
            ).data
        )

    def get_serializer_class(
        self
    ):

        if self.action == 'create':

            return (
                SalesOrderCreateSerializer
            )

        if self.action in [
            'update',
            'partial_update'
        ]:

            return (
                SalesOrderUpdateSerializer
            )

        return (
            SalesOrderSerializer
        )

    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        input_serializer = (
            SalesOrderCreateSerializer(
                data=request.data
            )
        )

        input_serializer.is_valid(
            raise_exception=True
        )

        data = (
            input_serializer.validated_data
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

        order = (
            SalesOrderService
            .create_order(
                company=profile.company,

                customer=customer,

                document_date=data[
                    'document_date'
                ],

                currency=currency,

                created_by=request.user,

                lines=data[
                    'lines'
                ],

                notes=data.get(
                    'notes',
                    ''
                )
            )
        )

        output_serializer = (
            SalesOrderSerializer(
                order
            )
        )

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED
        )

    def update(
        self,
        request,
        *args,
        **kwargs
    ):

        order = self.get_object()

        serializer = (
            SalesOrderUpdateSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = serializer.validated_data

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

        order = (
            SalesOrderUpdateService
            .update_order(

                order=order,

                customer=customer,

                document_date=data[
                    'document_date'
                ],

                currency=currency,

                lines=data[
                    'lines'
                ],

                notes=data.get(
                    'notes',
                    ''
                )
            )
        )

        return Response(
            SalesOrderSerializer(
                order
            ).data
        )