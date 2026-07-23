import {
  useQuery
} from '@tanstack/react-query'

import {
  getAgingReport
} from '../services/finance.service'

export function useAgingReport() {

  return useQuery({

    queryKey: [
      'aging-report'
    ],

    queryFn:
      getAgingReport

  })

}