import {
  useQuery
} from '@tanstack/react-query'

import {
  getPurchaseOrders
} from '../services/purchase.service'

export function usePurchaseOrders() {

  return useQuery({

    queryKey: [
      'purchase-orders'
    ],

    queryFn:
      getPurchaseOrders

  })

}