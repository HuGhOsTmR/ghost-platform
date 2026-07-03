from .accounts_receivable_query_service import (
    AccountsReceivableQueryService
)

from .accounts_payable_query_service import (
    AccountsPayableQueryService
)

from .aging_report_service import (
    AgingReportService
)

from .payables_aging_report_service import (
    PayablesAgingReportService
)

class FinanceDashboardService:

    @staticmethod
    def get_dashboard():

        total_receivables = (
            AccountsReceivableQueryService
            .get_total_receivables()
        )

        total_payables = (
            AccountsPayableQueryService
            .get_total_payables()
        )

        return {

            'receivables': {

                'total_balance':
                    total_receivables,

                'aging':
                    AgingReportService
                    .get_aging_report()
            },

            'payables': {

                'total_balance':
                    total_payables,

                'aging':
                    PayablesAgingReportService
                    .get_aging_report()
            },

            'working_capital': (
                total_receivables -
                total_payables
            )
        }