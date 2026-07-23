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

  export const approveSalesOrder =
  async (
    id: number
  ) => {

    const response =
      await api.post(

        `/sales/orders/${id}/approve/`

      )

    return response.data

  }

  export const getSalesInvoices =
    async () => {

      const response =
        await api.get(
          '/sales/invoices/'
        )

      return response.data

    }

  export const getSalesInvoice =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/sales/invoices/${id}/`
      )

    return response.data

  }

  export const cancelSalesInvoice =
  async (
    id: number
  ) => {

    const response =
      await api.post(
        `/sales/invoices/${id}/cancel/`
      )

    return response.data

  }

  export const updateSalesOrder =
  async (
    id: number,
    payload: any
  ) => {

    const response =
      await api.put(
        `/sales/orders/${id}/`,
        payload
      )

    return response.data

  }

export const createSalesInvoice =
  async (
    payload: any
  ) => {

    const response =
      await api.post(

        '/sales/invoices/',

        payload

      )

    return response.data

  }