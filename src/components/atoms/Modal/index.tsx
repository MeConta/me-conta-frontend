import { ReactNode } from 'react'
import * as S from './styles'

interface ModalProps {
  isEnabled: boolean
  children: ReactNode
}

export default function Modal({ isEnabled, children }: ModalProps) {
  return isEnabled ? (
    <S.DivContainer
      isEnabled={isEnabled}
      role="modal"
      data-testid="modal-container"
    >
      <S.ModalContent data-testid="content-container">
        <button></button>
        {children}
      </S.ModalContent>
    </S.DivContainer>
  ) : (
    <div></div>
  )
}
