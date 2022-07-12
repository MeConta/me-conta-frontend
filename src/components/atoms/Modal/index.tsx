import { ReactNode, useState } from 'react'
import CloseButton from '../CloseButton'
import * as S from './styles'

interface ModalProps {
  isEnabled: boolean
  children: ReactNode
}

export default function Modal({ isEnabled, children }: ModalProps) {
  const [isVisible, setVisible] = useState(true)
  console.log('Modal')
  return isEnabled ? (
    <S.DivContainer
      isEnabled={isVisible}
      role="modal"
      data-testid="modal-container"
    >
      <S.ModalContent data-testid="content-container">
        <CloseButton onClick={() => setVisible(false)}></CloseButton>
        {children}
      </S.ModalContent>
    </S.DivContainer>
  ) : (
    <div></div>
  )
}
