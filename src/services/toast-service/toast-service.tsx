import { createContext, ReactNode, useContext } from 'react'
import { toast } from 'react-toastify'

export enum ToastType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info'
}

type EmitParams = {
  type: ToastType
  message: string | JSX.Element
  autoClose?: boolean
  autoCloseMs?: number
}

type ToastProps = {
  emit: (params: EmitParams) => void
}

type ToastProviderProps = {
  children: ReactNode
}

export const ToastContext = createContext<ToastProps>({} as ToastProps)

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const emit = ({
    type,
    message,
    autoClose = true,
    autoCloseMs = 5000
  }: EmitParams) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: autoClose ? autoCloseMs : false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  return (
    <ToastContext.Provider value={{ emit: emit }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastProps {
  const context = useContext(ToastContext)
  return context
}
