from decimal import Decimal

from django.db import transaction

from sales.models import (
    SalesOrder,
    SalesOrderLine
)

from core.application.services.numeration_service import (
    NumerationService
)

from mdm.models import (
    Product,
    UnitOfMeasure
)

class SalesOrderService:

    @staticmethod
    @transaction.atomic
    def create_order(
        *,
        company,
        customer,
        document_date,
        currency,
        created_by,
        lines,
        notes=''
    ):

        if not lines:

            raise ValueError(
                "Sales Order requires at least one line."
            )

        document_number = (
            NumerationService.get_next_number(
                company=company,
                document_type='SALES_ORDER',
                fiscal_year=document_date.year
            )
        )

        order = (
            SalesOrder.objects.create(
                company=company,

                customer=customer,

                document_number=document_number,

                fiscal_year=document_date.year,

                document_date=document_date,

                currency=currency,

                exchange_rate=Decimal('1'),

                notes=notes,

                created_by=created_by
            )
        )

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

            product = Product.objects.get(
                pk=item['product']
            )

            unit_of_measure = (
                UnitOfMeasure.objects.get(
                    pk=item['unit_of_measure']
                )
            )
            
            SalesOrderLine.objects.create(
                sales_order=order,

                product=product,

                unit_of_measure=unit_of_measure,

                quantity=quantity,

                unit_price=unit_price,

                tax_percentage=tax_percentage,

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