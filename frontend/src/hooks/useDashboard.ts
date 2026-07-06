import {
  useQuery
} from '@tanstack/react-query'

import {
  getFinanceDashboard,
  getTreasuryDashboard
} from '../services/dashboard.service'

export const useFinanceDashboard =
  () => {

    return useQuery({

      queryKey: [
        'finance-dashboard'
      ],

      queryFn:
        getFinanceDashboard
    })
}

export const useTreasuryDashboard =
  () => {

    return useQuery({

      queryKey: [
        'treasury-dashboard'
      ],

      queryFn:
        getTreasuryDashboard
    })
}