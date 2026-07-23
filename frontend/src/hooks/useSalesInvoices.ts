import {
  useQuery
} from '@tanstack/react-query'

import {
  getSalesInvoices
} from '../services/sales.service'

export function useSalesInvoices() {

  return useQuery({

    queryKey: [
      'sales-invoices'
    ],

    queryFn:
      getSalesInvoices

  })

}