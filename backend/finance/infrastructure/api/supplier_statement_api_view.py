from rest_framework.views import APIView
from rest_framework.response import Response

from mdm.models import Supplier

from finance.application.services import (
    SupplierStatementService
)

from drf_spectacular.utils import (
    extend_schema
)

from finance.infrastructure.serializers import (
    SupplierStatementSerializer
)


@extend_schema(
    responses=SupplierStatementSerializer
)

class SupplierStatementAPIView(APIView):

    def get(
        self,
        request,
        supplier_id
    ):

        supplier = Supplier.objects.get(
            pk=supplier_id
        )

        data = (
            SupplierStatementService
            .get_statement(
                supplier
            )
        )

        return Response(data)