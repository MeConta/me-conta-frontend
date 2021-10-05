import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { api } from 'services/api/api'
import { ToastType, useToast } from 'services/toast-service/toast-service'
import {
  EHttpErrorCode,
  getErrorMessage
} from 'utils/enums/http-error-code.enum'
import { getSuccessMessage } from 'utils/enums/http-success-code.enum'

export function Toast() {
  const { emit } = useToast()

  useEffect(() => addToastInApiInterceptor(), [])

  const addToastInApiInterceptor = () => {
    api.interceptors.response.use(
      (response) => {
        const httpStatusCode = response?.status
        emit(ToastType.SUCCESS, getSuccessMessage(httpStatusCode))
        return response
      },
      (error) => {
        const httpErrorCode = error?.response?.data?.code as EHttpErrorCode
        emit(ToastType.ERROR, getErrorMessage(httpErrorCode))
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
