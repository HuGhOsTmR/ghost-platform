from rest_framework.views import APIView
from rest_framework.response import Response

from mdm.models import Customer

from finance.application.services import (
    CustomerStatementService
)

from drf_spectacular.utils import (
    extend_schema
)

from finance.infrastructure.serializers import (
    CustomerStatementSerializer
)


@extend_schema(
    responses=CustomerStatementSerializer
)
class CustomerStatementAPIView(APIView):

    def get(
        self,
        request,
        customer_id
    ):

        customer = Customer.objects.get(
            pk=customer_id
        )

        data = (
            CustomerStatementService
            .get_statement(
                customer
            )
        )

        return Response(data)