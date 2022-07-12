import { ReactNode } from 'react'
import * as S from './styles'

interface ModalProps {
  isEnabled: boolean
  // width: number
  // height: number
  // approval: boolean
  children: ReactNode
}

export default function Modal({ isEnabled, children }: ModalProps) {
  return isEnabled ? (
    <S.DivContainer
      isEnabled={isEnabled}
      role="modal"
      data-testid="modal-container"
    >
      <div>{children}</div>
    </S.DivContainer>
  ) : (
    <div></div>
  )
}
