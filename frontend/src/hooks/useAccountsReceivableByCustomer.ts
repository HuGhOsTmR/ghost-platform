import {
  useQuery
} from '@tanstack/react-query'

import {
  getAccountsReceivableByCustomer
} from '../services/finance.service'

export function useAccountsReceivableByCustomer(
  customerId?: number
) {

  return useQuery({

    queryKey: [
      'accounts-receivable',
      customerId
    ],

    queryFn: () =>
      getAccountsReceivableByCustomer(
        customerId!
      ),

    enabled:
      !!customerId,

    select: (data) =>

      data.filter(

        (item: any) =>

          item.status === 'OPEN'

          ||

          item.status === 'PARTIAL'

      )

  })

}