import {
  useQuery
} from '@tanstack/react-query'

import {
  getAccountsReceivable
} from '../services/finance.service'

export function useAccountsReceivable() {

  return useQuery({

    queryKey: [
      'accounts-receivable'
    ],

    queryFn:
      getAccountsReceivable

  })

}