import {
  useQuery
} from '@tanstack/react-query'

import {
  getCustomerPayment
} from '../services/finance.service'

export function useCustomerPayment(
  id: string
) {

  return useQuery({

    queryKey: [
      'customer-payment',
      id
    ],

    queryFn: () =>
      getCustomerPayment(id),

    enabled: !!id

  })

}