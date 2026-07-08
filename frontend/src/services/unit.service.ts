import { api } from './api'

export const getUnits = async () => {

  const response =
    await api.get(
      '/mdm/units/'
    )

  return response.data
}