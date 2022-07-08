import { createContext, ReactNode } from 'react'

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

const emitMock = jest.fn()

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <ToastContext.Provider value={{ emit: emitMock }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastProps {
  return { emit: emitMock }
}
