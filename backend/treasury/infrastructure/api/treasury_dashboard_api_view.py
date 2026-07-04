from rest_framework.views import APIView
from rest_framework.response import Response

from drf_spectacular.utils import (
    extend_schema
)

from treasury.application.services import (
    TreasuryDashboardService
)

from treasury.infrastructure.serializers import (
    TreasuryDashboardSerializer
)


@extend_schema(
    responses=TreasuryDashboardSerializer
)
class TreasuryDashboardAPIView(
    APIView
):

    def get(
        self,
        request
    ):

        data = (
            TreasuryDashboardService
            .get_dashboard()
        )

        return Response(data)