import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { api } from 'services/api/api'
import { ToastType, useToast } from 'services/toast-service/toast-service'
import { getErrorMessage } from 'utils/handlers/errorHandler'

export function Toast() {
  const { emit } = useToast()

  useEffect(() => addToastInApiInterceptor(), [])

  const addToastInApiInterceptor = () => {
    api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        emit({ type: ToastType.ERROR, message: getErrorMessage(error) })
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
