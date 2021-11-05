import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { api } from 'services/api/api'
import { ToastType, useToast } from 'services/toast-service/toast-service'
import { getErrorMessage } from 'utils/enums/http-error-code.enum'

export function Toast() {
  const { emit } = useToast()

  useEffect(() => addToastInApiInterceptor(), [])

  const addToastInApiInterceptor = () => {
    api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        emit(ToastType.ERROR, getErrorMessage(error))
        return Promise.reject(error)
      }
    )
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
