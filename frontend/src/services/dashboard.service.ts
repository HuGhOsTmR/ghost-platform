import { api } from './api'

export const getFinanceDashboard =
  async () => {

    const response =
      await api.get(
        '/finance/dashboard/'
      )

    return response.data
}

export const getTreasuryDashboard =
  async () => {

    const response =
      await api.get(
        '/treasury/dashboard/'
      )

    return response.data
}