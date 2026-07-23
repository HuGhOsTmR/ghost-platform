import { api } from './api'

export const getSuppliers =
  async () => {

    const response =
      await api.get(
        '/mdm/suppliers/'
      )

    return response.data

  }