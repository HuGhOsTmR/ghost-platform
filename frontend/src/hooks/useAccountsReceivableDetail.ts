import {
  useQuery
} from '@tanstack/react-query'

import {
  getAccountsReceivableDetail
} from '../services/finance.service'

export function useAccountsReceivableDetail(
  id: string
) {

  return useQuery({

    queryKey: [
      'accounts-receivable',
      id
    ],

    queryFn: () =>
      getAccountsReceivableDetail(id),

    enabled: !!id

  })

}