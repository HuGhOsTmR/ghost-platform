import {
  useMutation
} from '@tanstack/react-query'

import { api }
  from '../services/api'

export function useReopenSalesOrder() {

  return useMutation({

    mutationFn: async (
      id: number
    ) => {

      const response =
        await api.post(
          `/sales/orders/${id}/reopen/`
        )

      return response.data

    }

  })

}