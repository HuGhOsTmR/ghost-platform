from django.db import transaction

from sales.models import (
    SalesOrder
)


class SalesOrderApprovalService:

    @staticmethod
    @transaction.atomic
    def approve_order(
        order
    ):

        if (
            order.status !=
            SalesOrder.STATUS_DRAFT
        ):

            raise ValueError(
                "Only draft orders can be approved."
            )

        order.status = (
            SalesOrder.STATUS_APPROVED
        )

        order.save()

        return order