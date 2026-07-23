import {
  useQuery
} from '@tanstack/react-query'

import {
  getFinanceDashboard
} from '../services/finance.service'

export function useFinanceDashboard() {

  return useQuery({

    queryKey: [
      'finance-dashboard'
    ],

    queryFn:
      getFinanceDashboard

  })

}