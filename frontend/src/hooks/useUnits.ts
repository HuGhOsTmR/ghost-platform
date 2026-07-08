import { useQuery }
  from '@tanstack/react-query'

import {
  getUnits
} from '../services/unit.service'

export function useUnits() {

  return useQuery({

    queryKey: ['units'],

    queryFn: getUnits

  })

}