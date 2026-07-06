import { useQuery } from '@tanstack/react-query'

import {
  getSalesOrders
} from '../services/sales.service'

export function useSalesOrders() {

  return useQuery({

    queryKey: [
      'sales-orders'
    ],

    queryFn: getSalesOrders
  })
}