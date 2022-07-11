import { AxiosError } from 'axios'

export function formatErrorMessage(errorMessage: string | Array<string>) {
  if (!Array.isArray(errorMessage)) {
    return errorMessage
  } else {
    return errorMessage.length > 0 ? errorMessage[0] : 'Erro genérico'
  }
}

export function getErrorMessage(error: AxiosError) {
  const errorMessage = error?.response?.data?.message

  if (errorMessage) {
    return formatErrorMessage(errorMessage)
  }

  return (
    <div>
      Algo deu errado!
      <br /> Tente novamente mais tarde.
    </div>
  )
}
