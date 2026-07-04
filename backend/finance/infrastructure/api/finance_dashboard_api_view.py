from rest_framework.views import APIView
from rest_framework.response import Response

from finance.application.services import (
    FinanceDashboardService
)

from drf_spectacular.utils import (
    extend_schema
)

from finance.infrastructure.serializers import (
    FinanceDashboardSerializer
)


@extend_schema(
    responses=FinanceDashboardSerializer
)

class FinanceDashboardAPIView(APIView):

    def get(
        self,
        request
    ):

        data = (
            FinanceDashboardService
            .get_dashboard()
        )

        return Response(data)