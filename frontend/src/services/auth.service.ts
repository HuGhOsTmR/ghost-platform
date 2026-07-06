import { api } from './api'

export interface LoginRequest {
  username: string
  password: string
}

export const login = async (
  data: LoginRequest
) => {

  const response = await api.post(
    '/token/',
    data
  )

  return response.data
}