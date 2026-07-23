import {
  useQuery
} from '@tanstack/react-query'

import {
  getPurchaseOrder
} from '../services/purchase.service'

export function usePurchaseOrder(
  id: string
) {

  return useQuery({

    queryKey: [
      'purchase-order',
      id
    ],

    queryFn: () =>
      getPurchaseOrder(id),

    enabled: !!id

  })

}