import * as S from './styles'
import { Close } from 'styled-icons/evil'

type ChipProps = {
  text: string
  isClosable?: boolean
  backgroundColor?: string
  textColor?: string
  onClose?: Function
}

export default function Chip({
  text,
  isClosable = false,
  backgroundColor = 'white',
  textColor = 'black',
  onClose
}: ChipProps) {
  return (
    <S.Chip
      data-testid="chip"
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      {text}
      {isClosable && (
        <S.CloseButton
          data-testid="closeChip"
          onClick={() => {
            if (!!onClose) onClose()
          }}
        >
          <Close />
        </S.CloseButton>
      )}
    </S.Chip>
  )
}
