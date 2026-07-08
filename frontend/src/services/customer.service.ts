import { api } from './api'

export const getCustomers = async () => {

  const response =
    await api.get(
      '/mdm/customers/'
    )

  return response.data

}