import { AxiosError } from 'axios'

export function getErrorMessage(error: AxiosError) {
  const errorMessage = error?.response?.data?.message

  if (errorMessage) {
    return errorMessage
  }
  return (
    <div>
      Algo deu errado!
      <br /> Tente novamente mais tarde.
    </div>
  )
}
