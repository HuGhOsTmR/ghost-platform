import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  createCustomerPayment
} from '../services/finance.service'

export function useCreateCustomerPayment() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      createCustomerPayment,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          'customer-payments'
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