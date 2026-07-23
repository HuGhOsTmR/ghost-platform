from decimal import Decimal

from django.db import transaction

from rest_framework.exceptions import ValidationError

from mdm.models import (
    Product,
    UnitOfMeasure
)

from sales.models import (
    SalesOrderLine,
    SalesInvoice
)


class SalesOrderUpdateService:

    @staticmethod
    @transaction.atomic
    def update_order(
        *,
        order,
        customer,
        document_date,
        currency,
        lines,
        notes=''
    ):

        if order.status != 'DRAFT':

            raise ValueError(
                'Only DRAFT orders can be edited.'
            )

        active_invoices = (
            order.invoices
            .exclude(
                status=SalesInvoice.STATUS_CANCELLED
            )
        )

        if active_invoices.exists():

            raise ValidationError(
                'Order has active invoices and cannot be edited.'
            )

        order.customer = customer

        order.document_date = (
            document_date
        )

        order.currency = currency

        order.notes = notes

        order.save()

        order.lines.all().delete()

        subtotal = Decimal('0')

        tax_amount = Decimal('0')

        for item in lines:

            quantity = Decimal(
                str(
                    item['quantity']
                )
            )

            unit_price = Decimal(
                str(
                    item['unit_price']
                )
            )

            tax_percentage = Decimal(
                str(
                    item.get(
                        'tax_percentage',
                        0
                    )
                )
            )

            line_total = (
                quantity *
                unit_price
            )

            product = (
                Product.objects.get(
                    pk=item['product']
                )
            )

            unit_of_measure = (
                UnitOfMeasure.objects.get(
                    pk=item[
                        'unit_of_measure'
                    ]
                )
            )

            SalesOrderLine.objects.create(

                sales_order=order,

                product=product,

                unit_of_measure=(
                    unit_of_measure
                ),

                quantity=quantity,

                unit_price=unit_price,

                tax_percentage=(
                    tax_percentage
                ),

                line_total=line_total,

                notes=item.get(
                    'notes',
                    ''
                )

            )

            subtotal += line_total

            tax_amount += (
                line_total *
                tax_percentage /
                Decimal('100')
            )

        order.subtotal = subtotal

        order.tax_amount = tax_amount

        order.total_amount = (
            subtotal +
            tax_amount
        )

        order.save()

        return order