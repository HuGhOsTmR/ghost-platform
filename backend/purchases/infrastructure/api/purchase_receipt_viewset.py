from rest_framework import (
    viewsets,
    status
)
from django.shortcuts import (
    get_object_or_404
)
from rest_framework.response import Response

from purchases.models import (
    PurchaseReceipt,
    PurchaseOrder
)

from purchases.application.services import (
    PurchaseReceiptService
)

from purchases.infrastructure.serializers import (
    PurchaseReceiptSerializer,
    PurchaseReceiptCreateSerializer
)


class PurchaseReceiptViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        PurchaseReceipt.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        PurchaseReceiptSerializer
    )

    def get_serializer_class(
        self
    ):

        if self.action == 'create':

            return (
                PurchaseReceiptCreateSerializer
            )

        return (
            PurchaseReceiptSerializer
        )

    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        input_serializer = (
            PurchaseReceiptCreateSerializer(
                data=request.data
            )
        )

        input_serializer.is_valid(
            raise_exception=True
        )

        data = (
            input_serializer.validated_data
        )

        purchase_order = (
            get_object_or_404(
                PurchaseOrder,
                pk=data['purchase_order']
            )
        )

        receipt = (
            PurchaseReceiptService
            .create_receipt(
                purchase_order=purchase_order,
                receipt_date=data[
                    'receipt_date'
                ],
                created_by=request.user,
                lines=data[
                    'lines'
                ]
            )
        )

        output_serializer = (
            PurchaseReceiptSerializer(
                receipt
            )
        )

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED
        )