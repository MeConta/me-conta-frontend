import * as S from './styles'
import { Close } from '@styled-icons/material'

type CloseButtonProps = {
  onClick: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <S.CloseButton
      id="close-button"
      data-testid="close"
      onClick={() => onClick()}
      key="close"
    >
      <Close size={'24'} color={'#5f5f5f'} />
    </S.CloseButton>
  )
}
