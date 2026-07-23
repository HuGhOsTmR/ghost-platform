from django.db import transaction

from sales.models import (
    SalesInvoice
)


class SalesInvoiceCancelService:

    @staticmethod
    @transaction.atomic
    def cancel_invoice(
        invoice: SalesInvoice
    ):

        if (
            invoice.status ==
            SalesInvoice.STATUS_CANCELLED
        ):

            raise ValueError(
                'La factura ya está anulada'
            )

        invoice.status = (
            SalesInvoice.STATUS_CANCELLED
        )

        invoice.save()

        return invoice