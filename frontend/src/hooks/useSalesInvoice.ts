import {
  useQuery
} from '@tanstack/react-query'

import {
  getSalesInvoice
} from '../services/sales.service'

export function useSalesInvoice(
  id: string
) {

  return useQuery({

    queryKey: [
      'sales-invoice',
      id
    ],

    queryFn: () =>
      getSalesInvoice(id),

    enabled: !!id

  })

}