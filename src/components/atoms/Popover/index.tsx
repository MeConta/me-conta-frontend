import * as S from './styles'

export interface PopoverProps {
  title: string
  items: Array<string>
}

export default function Popover(props: PopoverProps) {
  const itemsList = props.items.map((item, index) => (
    <li key={index}>{item}</li>
  ))
  return (
    <S.Container id="popover" data-testid="popoverContainer">
      <S.TextContainer data-testid="popoverText">
        <S.ListTitle data-testid="popoverTextTitle">{props.title}</S.ListTitle>
        <ul data-testid="popoverTextItems">{itemsList}</ul>
      </S.TextContainer>
    </S.Container>
  )
}
