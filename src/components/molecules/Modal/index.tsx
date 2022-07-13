import { ReactNode, useState } from 'react'
import CloseButton from '../../atoms/CloseButton'
import * as S from './styles'

interface ModalProps {
  isEnabled: boolean
  width?: string
  height?: string
  funcCloseButton: () => void
  children: ReactNode
}

export default function Modal({
  isEnabled,
  children,
  funcCloseButton,
  width = '421px',
  height = '328px'
}: ModalProps) {
  return isEnabled ? (
    <S.DivContainer isVisible={true} role="modal" data-testid="modal-container">
      <S.ModalContent
        width={width}
        height={height}
        data-testid="content-container"
      >
        <S.ModalHeader>
          <CloseButton onClick={funcCloseButton} />
        </S.ModalHeader>
        {children}
      </S.ModalContent>
    </S.DivContainer>
  ) : (
    <></>
  )
}
