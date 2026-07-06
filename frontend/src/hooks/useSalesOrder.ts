import {
  useQuery
} from '@tanstack/react-query'

import {
  getSalesOrder
} from '../services/sales.service'

export function useSalesOrder(
  id: string
) {

  return useQuery({

    queryKey: [
      'sales-order',
      id
    ],

    queryFn: () =>
      getSalesOrder(id)

  })

}