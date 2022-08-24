import * as S from './styles'
import { Close } from 'styled-icons/evil'

type ChipProps = {
  text: string
  isClosable?: boolean
  backgroundColor?: string
  onClose?: Function
}

export default function Chip({
  text,
  isClosable = false,
  backgroundColor = 'white',
  onClose
}: ChipProps) {
  return (
    <S.Chip data-testid="chip" backgroundColor={backgroundColor}>
      {text}
      {isClosable && (
        <S.CloseButton
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
