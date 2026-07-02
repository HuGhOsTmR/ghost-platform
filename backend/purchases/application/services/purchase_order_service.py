from decimal import Decimal

from django.db import transaction

from purchases.models import (
    PurchaseOrder,
    PurchaseOrderLine
)

from core.application.services.numeration_service import (
    NumerationService
)


class PurchaseOrderService:

    @staticmethod
    @transaction.atomic
    def create_purchase_order(
        *,
        company,
        supplier,
        currency,
        created_by,
        fiscal_year,
        document_date,
        expected_delivery_date=None,
        notes='',
        exchange_rate=1,
        lines=None
    ):

        if not lines:
            raise ValueError(
                "Purchase Order requires at least one line."
            )

        document_number = (
            NumerationService.get_next_number(
                company=company,
                document_type='PURCHASE_ORDER',
                fiscal_year=fiscal_year
            )
        )

        purchase_order = PurchaseOrder.objects.create(
            company=company,
            supplier=supplier,
            document_number=document_number,
            fiscal_year=fiscal_year,
            document_date=document_date,
            expected_delivery_date=expected_delivery_date,
            currency=currency,
            exchange_rate=exchange_rate,
            created_by=created_by,
            notes=notes
        )

        subtotal = Decimal('0')
        tax_amount = Decimal('0')

        for item in lines:

            quantity = Decimal(
                str(item['quantity'])
            )

            unit_price = Decimal(
                str(item['unit_price'])
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

            PurchaseOrderLine.objects.create(
                purchase_order=purchase_order,
                product=item['product'],
                unit_of_measure=item[
                    'unit_of_measure'
                ],
                quantity=quantity,
                received_quantity=0,
                unit_price=unit_price,
                tax_percentage=tax_percentage,
                line_total=line_total
            )

            subtotal += line_total

            tax_amount += (
                line_total *
                tax_percentage /
                Decimal('100')
            )

        total_amount = (
            subtotal +
            tax_amount
        )

        purchase_order.subtotal = subtotal

        purchase_order.tax_amount = tax_amount

        purchase_order.total_amount = total_amount

        purchase_order.save()

        return purchase_order