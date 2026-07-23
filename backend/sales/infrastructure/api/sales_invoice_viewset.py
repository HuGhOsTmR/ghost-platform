from rest_framework import (
    viewsets,
    status
)

from rest_framework.response import (
    Response
)

from sales.models import (
    SalesInvoice,
    SalesOrder
)

from sales.application.services import (
    SalesInvoiceService
)

from sales.infrastructure.serializers import (
    SalesInvoiceSerializer,
    SalesInvoiceCreateSerializer
)

from rest_framework.decorators import (
    action
)

from sales.application.services import (
    SalesInvoiceCancelService
)

class SalesInvoiceViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        SalesInvoice.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        SalesInvoiceSerializer
    )

    def get_serializer_class(
        self
    ):

        if self.action == 'create':

            return (
                SalesInvoiceCreateSerializer
            )

        return (
            SalesInvoiceSerializer
        )

    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        serializer = (
            SalesInvoiceCreateSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = (
            serializer.validated_data
        )

        sales_order = (
            SalesOrder.objects.get(
                pk=data[
                    'sales_order'
                ]
            )
        )

        invoice = (
            SalesInvoiceService
            .create_invoice(
                sales_order=sales_order,

                invoice_date=data[
                    'invoice_date'
                ],

                created_by=request.user,

                lines=data[
                    'lines'
                ]
            )
        )

        return Response(
            SalesInvoiceSerializer(
                invoice
            ).data,
            status=status.HTTP_201_CREATED
        )

    @action(
        detail=True,
        methods=['post']
    )
    def cancel(
        self,
        request,
        pk=None
    ):

        invoice = (
            self.get_object()
        )

        invoice = (
            SalesInvoiceCancelService
            .cancel_invoice(
                invoice
            )
        )

        return Response(
            SalesInvoiceSerializer(
                invoice
            ).data
        )