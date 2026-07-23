import {
  useMutation
} from '@tanstack/react-query'

import {
  approveSalesOrder
} from '../services/sales.service'

export function useApproveSalesOrder() {

  return useMutation({

    mutationFn:
      approveSalesOrder

  })

}