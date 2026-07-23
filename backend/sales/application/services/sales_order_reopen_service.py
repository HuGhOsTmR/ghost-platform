from sales.models import (
    SalesOrder
)

from rest_framework.exceptions import (
    ValidationError
)

class SalesOrderReopenService:

    @staticmethod
    def reopen_order(
        order: SalesOrder
    ):

        if order.status != 'APPROVED':

            raise ValidationError(
                'Only APPROVED orders can be reopened.'
            )

        order.status = 'DRAFT'

        order.save()

        return order