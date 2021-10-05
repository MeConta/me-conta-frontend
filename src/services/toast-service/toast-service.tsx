import { createContext, ReactNode, useContext } from 'react'
import { toast } from 'react-toastify'

export enum ToastType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info'
}

type ToastProps = {
  emit: (type: ToastType, message: string | JSX.Element) => void
}

type ToastProviderProps = {
  children: ReactNode
}

export const ToastContext = createContext<ToastProps>({} as ToastProps)

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const emit = (type: ToastType, message: string | JSX.Element) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 5000,
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
