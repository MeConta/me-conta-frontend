import axios from 'axios'
import { parseCookies } from 'nookies'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const { token } = parseCookies()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.url?.concat('api/', config.url)
  return config
})
