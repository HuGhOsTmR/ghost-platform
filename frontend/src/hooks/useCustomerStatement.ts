import {
  useQuery
} from '@tanstack/react-query'

import {
  getCustomerStatement
} from '../services/finance.service'

export function useCustomerStatement(
  customerId?: number
) {

  return useQuery({

    queryKey: [
      'customer-statement',
      customerId
    ],

    queryFn: () =>

      getCustomerStatement(
        customerId!
      ),

    enabled:
      !!customerId

  })

}