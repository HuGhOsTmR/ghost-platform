import { useQuery }
  from '@tanstack/react-query'

import {
  getCurrencies
} from '../services/currency.service'

export function useCurrencies() {

  return useQuery({

    queryKey: ['currencies'],

    queryFn: getCurrencies

  })

}