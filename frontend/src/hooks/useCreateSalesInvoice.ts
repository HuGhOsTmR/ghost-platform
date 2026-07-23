import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  createSalesInvoice
} from '../services/sales.service'

export function useCreateSalesInvoice() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      createSalesInvoice,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          'sales-orders'
        ]

      })

      queryClient.invalidateQueries({

        queryKey: [
          'sales-invoices'
        ]

      })

      queryClient.invalidateQueries({

        queryKey: [
          'accounts-receivable'
        ]

      })

    }

  })

}