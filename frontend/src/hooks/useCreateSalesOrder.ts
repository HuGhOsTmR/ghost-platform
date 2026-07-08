import {
  useMutation
} from '@tanstack/react-query'

import {
  createSalesOrder
} from '../services/sales.service'

export function useCreateSalesOrder() {

  return useMutation({

    mutationFn:
      createSalesOrder

  })

}