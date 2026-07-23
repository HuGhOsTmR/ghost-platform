from rest_framework import serializers

from finance.models import (
    AccountsReceivable
)


class AccountsReceivableSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(
        source='customer.name',
        read_only=True
    )

    invoice_number = serializers.CharField(
        source='sales_invoice.invoice_number',
        read_only=True
    )

    payments = (
        serializers.SerializerMethodField()
    )

    def get_payments(
        self,
        obj
    ):

        return [

            {

                'id':
                    allocation.payment.id,

                'payment_number':
                    allocation.payment.payment_number,

                'payment_date':
                    allocation.payment.payment_date,

                'amount':
                    allocation.amount,

                'status':
                    allocation.payment.status

            }

            for allocation
            in obj.allocations.all()

        ]

    class Meta:

        model = AccountsReceivable

        fields = '__all__'