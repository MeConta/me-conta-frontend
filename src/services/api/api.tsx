import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const tokenLocalStorage = window.localStorage.getItem('token')
  if (tokenLocalStorage) {
    const token = JSON.parse(tokenLocalStorage)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
