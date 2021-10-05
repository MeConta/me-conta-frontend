import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { api } from 'services/api/api'
import { ToastType, useToast } from 'services/toast-service/toast-service'

export function Toast() {
  const { emit } = useToast()

  useEffect(() => addToastInApiInterceptor(), [])

  const addToastInApiInterceptor = () => {
    api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        emit(ToastType.ERROR, error?.response?.data?.message)
        return Promise.reject(error)
      }
    )
  }

  return (
    <div>
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
    </div>
  )
}
