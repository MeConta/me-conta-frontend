import axios, { AxiosError, AxiosResponse } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { CookieKeys } from 'store/auth-context'
import { AuthService } from '../auth-services/auth-service'

const IGNORED_ENDPOINTS = ['/auth/login', '/auth/refresh']

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const { [CookieKeys.TOKEN]: token } = parseCookies()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.url?.concat('api/', config.url)
  return config
})

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (err: AxiosError) => {
    return new Promise((resolve, reject) => {
      if (
        err.response?.status === 401 &&
        err.config &&
        !IGNORED_ENDPOINTS.includes(err.config.url || '')
      ) {
        const request = err.config
        const authService = new AuthService(api)
        const { [CookieKeys.REFRESH_TOKEN]: refreshToken } = parseCookies()
        authService
          .refreshToken({ refreshToken })
          .then(async (res) => {
            const { token, refreshToken } = res
            setCookie(null, CookieKeys.TOKEN, token)
            setCookie(null, CookieKeys.REFRESH_TOKEN, refreshToken)
            request.headers['Authorization'] = `Bearer ${token}`
            resolve(axios(request))
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        reject(err)
      }
    })
  }
)

export { api }
