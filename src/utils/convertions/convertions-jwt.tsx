import { DecodedToken } from 'types/data'

export const parseJwtToObject = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1])) as DecodedToken
  } catch (e) {
    return null
  }
}
