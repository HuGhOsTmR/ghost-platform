from finance.models import (
    AccountsReceivable
)

from finance.application.services import (
    AccountsReceivableQueryService
)


class CustomerStatementService:

    @staticmethod
    def get_statement(
        customer
    ):

        receivables = (
            AccountsReceivable.objects
            .filter(
                customer=customer
            )
            .order_by(
                'document_date'
            )
        )

        return {
            'customer': customer.name,

            'total_balance': (
                AccountsReceivableQueryService
                .get_customer_balance(
                    customer
                )
            ),

            'documents': [
                {
                    'id':
                        item.id, 

                    'document_number':
                        item.document_number,

                    'document_date':
                        item.document_date,

                    'original_amount':
                        item.original_amount,

                    'paid_amount':
                        item.paid_amount,

                    'balance_amount':
                        item.balance_amount,

                    'status':
                        item.status
                }
                for item in receivables
            ]
        }