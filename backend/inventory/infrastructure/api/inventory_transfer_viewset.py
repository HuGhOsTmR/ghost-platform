from rest_framework import (
    viewsets,
    status
)

from rest_framework.decorators import (
    action
)

from rest_framework.response import (
    Response
)

from inventory.models import (
    InventoryTransfer
)

from inventory.infrastructure.serializers import (
    InventoryTransferSerializer,
    InventoryTransferCreateSerializer
)

from inventory.application.services import (
    InventoryTransferService,
    InventoryTransferApprovalService,
    InventoryTransferPostingService
)

from iam.models import (
    UserProfile
)


class InventoryTransferViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        InventoryTransfer.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        InventoryTransferSerializer
    )

    def get_serializer_class(
        self
    ):

        if self.action == 'create':

            return (
                InventoryTransferCreateSerializer
            )

        return (
            InventoryTransferSerializer
        )

    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        serializer = (
            InventoryTransferCreateSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        profile = (
            UserProfile.objects.get(
                user=request.user
            )
        )

        transfer = (
            InventoryTransferService
            .create_transfer(
                company=profile.company,

                source_warehouse=serializer
                .validated_data[
                    'source_warehouse'
                ],

                destination_warehouse=serializer
                .validated_data[
                    'destination_warehouse'
                ],

                transfer_date=serializer
                .validated_data[
                    'transfer_date'
                ],

                created_by=request.user,

                lines=serializer
                .validated_data[
                    'lines'
                ],

                notes=serializer
                .validated_data.get(
                    'notes',
                    ''
                )
            )
        )

        return Response(
            InventoryTransferSerializer(
                transfer
            ).data,
            status=status.HTTP_201_CREATED
        )

    @action(
        detail=True,
        methods=['post']
    )
    def approve(
        self,
        request,
        pk=None
    ):

        transfer = (
            self.get_object()
        )

        transfer = (
            InventoryTransferApprovalService
            .approve_transfer(
                transfer
            )
        )

        return Response(
            InventoryTransferSerializer(
                transfer
            ).data
        )

    @action(
        detail=True,
        methods=['post']
    )
    def post_transfer(
        self,
        request,
        pk=None
    ):

        transfer = (
            self.get_object()
        )

        transfer = (
            InventoryTransferPostingService
            .post_transfer(
                transfer,
                request.user
            )
        )

        return Response(
            InventoryTransferSerializer(
                transfer
            ).data
        )