import { ReactNode } from 'react'
import * as S from './styles'

interface ModalProps {
  isEnabled: boolean
  children: ReactNode
}

export default function Modal({ children, isEnabled }: ModalProps) {
  return (
    <S.DivContainer isEnabled={isEnabled} role="modal">
      {children}
    </S.DivContainer>
  )
}
