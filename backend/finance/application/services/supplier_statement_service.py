from finance.models import (
    AccountsPayable
)

from .accounts_payable_query_service import (
    AccountsPayableQueryService
)


class SupplierStatementService:

    @staticmethod
    def get_statement(
        supplier
    ):

        payables = (
            AccountsPayable.objects
            .filter(
                supplier=supplier
            )
            .order_by(
                'document_date'
            )
        )

        return {

            'supplier': supplier.name,

            'total_balance': (
                AccountsPayableQueryService
                .get_supplier_balance(
                    supplier
                )
            ),

            'documents': [

                {

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

                for item in payables
            ]
        }