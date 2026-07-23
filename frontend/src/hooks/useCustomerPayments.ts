import {
  useQuery
} from '@tanstack/react-query'

import {
  getCustomerPayments
} from '../services/finance.service'

export function useCustomerPayments() {

  return useQuery({

    queryKey: [
      'customer-payments'
    ],

    queryFn:
      getCustomerPayments

  })

}