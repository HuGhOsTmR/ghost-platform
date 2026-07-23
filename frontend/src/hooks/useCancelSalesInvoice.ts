import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  cancelSalesInvoice
} from '../services/sales.service'

export function useCancelSalesInvoice() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      cancelSalesInvoice,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          'sales-invoices'
        ]
      })

      queryClient.invalidateQueries({
        queryKey: [
          'sales-invoice'
        ]
      })

    }

  })

}