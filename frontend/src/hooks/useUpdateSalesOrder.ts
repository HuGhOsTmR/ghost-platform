import {
  useMutation
} from '@tanstack/react-query'

import {
  updateSalesOrder
} from '../services/sales.service'

export function useUpdateSalesOrder() {

  return useMutation({

    mutationFn: ({
      id,
      payload
    }: any) =>

      updateSalesOrder(
        id,
        payload
      )

  })

}