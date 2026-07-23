
import {
  api
  } from './api'

export const getBankAccounts =
  async () => {

    const response =
      await api.get(
        '/treasury/bank-accounts/'
      )

    return response.data

  }

  export const getBankAccount =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/treasury/bank-accounts/${id}/`
      )

    return response.data

  }

