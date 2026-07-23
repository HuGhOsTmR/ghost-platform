from rest_framework.views import (
    APIView
)

from rest_framework.response import (
    Response
)

from drf_spectacular.utils import (
    extend_schema
)

from finance.application.services import (
    AgingReportService
)

from finance.infrastructure.serializers import (
    AgingReportSerializer
)


@extend_schema(
    responses={
        200: AgingReportSerializer(
            many=True
        )
    }
)
class AgingReportAPIView(
    APIView
):

    def get(
        self,
        request
    ):

        data = (

            AgingReportService
            .get_detailed_aging_report()

        )

        return Response(
            data
        )