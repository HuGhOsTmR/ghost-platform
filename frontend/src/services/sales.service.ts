import { api } from './api'

export const getSalesOrders = async () => {

  const response = await api.get(
    '/sales/orders/'
  )

  return response.data
}

export const getSalesOrder = async (
  id: string
) => {

  const response =
    await api.get(
      `/sales/orders/${id}/`
    )

  return response.data
}

export const createSalesOrder =
  async (
    payload: any
  ) => {

    const response =
      await api.post(

        '/sales/orders/',

        payload

      )

    return response.data

  }