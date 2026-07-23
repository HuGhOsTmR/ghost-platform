from datetime import date

from rest_framework import (
    viewsets,
    status
)

from rest_framework.response import Response

from purchases.models import (
    PurchaseOrder
)

from purchases.infrastructure.serializers import (
    PurchaseOrderSerializer,
    PurchaseOrderCreateSerializer
)

from purchases.application.services import (
    PurchaseOrderService
)

from mdm.models import (
    Supplier,
    Product,
    UnitOfMeasure
)

from core.models import Currency


class PurchaseOrderViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        PurchaseOrder.objects
        .select_related(
            "supplier",
            "currency",
            "warehouse",      # si existe este campo
        )
        .prefetch_related(
            "lines",
            "lines__product",
            "lines__unit_of_measure",
        )
        .order_by("-id")
    )

    serializer_class = (
        PurchaseOrderSerializer
    )

    def get_serializer_class(
        self
    ):

        if self.action == 'create':

            return (
                PurchaseOrderCreateSerializer
            )

        return (
            PurchaseOrderSerializer
        )

    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        input_serializer = (
            PurchaseOrderCreateSerializer(
                data=request.data
            )
        )

        input_serializer.is_valid(
            raise_exception=True
        )

        data = (
            input_serializer.validated_data
        )

        supplier = Supplier.objects.get(
            pk=data['supplier']
        )

        currency = Currency.objects.get(
            pk=data['currency']
        )

        company = (
            request.user
            .userprofile
            .company
        )

        lines = []

        for item in data['lines']:

            product = Product.objects.get(
                pk=item['product']
            )

            unit_of_measure = (
                UnitOfMeasure.objects.get(
                    pk=item['unit_of_measure']
                )
            )

            lines.append(
                {
                    'product': product,
                    'unit_of_measure': unit_of_measure,
                    'quantity': item['quantity'],
                    'unit_price': item['unit_price'],
                    'tax_percentage': item.get(
                        'tax_percentage',
                        0
                    )
                }
            )

        purchase_order = (
            PurchaseOrderService
            .create_purchase_order(
                company=company,
                supplier=supplier,
                currency=currency,
                created_by=request.user,
                fiscal_year=date.today().year,
                document_date=data[
                    'document_date'
                ],
                expected_delivery_date=data.get(
                    'expected_delivery_date'
                ),
                notes=data.get(
                    'notes',
                    ''
                ),
                lines=lines
            )
        )

        output_serializer = (
            PurchaseOrderSerializer(
                purchase_order
            )
        )

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED
        )