import { api } from './api'

export const getCurrencies = async () => {

  const response =
    await api.get(
      '/core/currencies/'
    )

  return response.data
}