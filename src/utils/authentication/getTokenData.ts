import { parseCookies } from 'nookies'
import { parseJwtToObject } from '../convertions/convertions-jwt'

type TokenData = {
  id: number
  email: string
}

export function getTokenData(): TokenData | null {
  const { token } = parseCookies()

  const tokenDecoded = parseJwtToObject(token)

  if (tokenDecoded) {
    return {
      id: tokenDecoded.sub,
      email: tokenDecoded.email
    }
  }

  return null
}
