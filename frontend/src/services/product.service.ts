import { api } from './api'

export const getProducts = async () => {

  const response =
    await api.get(
      '/mdm/products/'
    )

  return response.data

}