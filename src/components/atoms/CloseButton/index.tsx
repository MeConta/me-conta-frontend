import * as S from './styles'
import { Close } from '@styled-icons/material'

export default function CloseButton() {
  return (
    <S.CloseButton
      id="close-button"
      data-testid="close"
      // onClick={() => setVisible(false)}
      key="close"
    >
      <Close size={'24'} color={'#5f5f5f'} />
    </S.CloseButton>
  )
}
