import {
  useQuery
} from '@tanstack/react-query'

import {
  getBankAccounts
} from '../services/treasury.service'

export function useBankAccounts() {

  return useQuery({

    queryKey: [
      'bank-accounts'
    ],

    queryFn:
      getBankAccounts

  })

}