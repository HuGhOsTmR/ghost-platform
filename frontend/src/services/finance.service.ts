import {
  api
  } from './api'

export const getAccountsReceivable =
  async () => {

    const response =
      await api.get(
        '/finance/accounts-receivable/'
      )

    return response.data

  }
  export const getAccountsReceivableDetail =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/finance/accounts-receivable/${id}/`
      )

    return response.data

  }

  export const getCustomerPayments =
  async () => {

    const response =
      await api.get(
        '/finance/customer-payments/'
      )

    return response.data

  }

  export const getCustomerPayment =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/finance/customer-payments/${id}/`
      )

    return response.data

  }

  export const createCustomerPayment =
  async (
    payload: any
  ) => {

    const response =
      await api.post(

        '/finance/customer-payments/',

        payload

      )

    return response.data

  }

  export const getAccountsReceivableByCustomer =
  async (
    customerId: number
  ) => {

    const response =
      await api.get(

        '/finance/accounts-receivable/',

        {

          params: {

            customer:
              customerId

          }

        }

      )

    return response.data

  }

  export const getCustomerStatement =
    async (
      customerId: number
    ) => {

      const response =
        await api.get(
          `/finance/customers/${customerId}/statement/`
        )

      return response.data

    }

  export const getFinanceDashboard =
    async () => {

      const response =
        await api.get(
          '/finance/dashboard/'
        )

      return response.data

    }


  export const getAgingReport =
    async () => {

      const response =
        await api.get(
          '/finance/aging-report/'
        )

      return response.data

    }