import { AxiosError } from 'axios'
import { array } from 'yup'

export function getErrorMessage(error: AxiosError) {
  const errorMessage = error?.response?.data?.message

  if (errorMessage) {
    return Array.isArray(errorMessage) && errorMessage.length > 0
      ? errorMessage[0]
      : errorMessage
  }
  return (
    <div>
      Algo deu errado!
      <br /> Tente novamente mais tarde.
    </div>
  )
}
