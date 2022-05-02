import * as S from './styles'

interface CircleProp {
  active?: boolean
  displayLine?: boolean
  icon?: any
  paddingLeft?: string
  children?: string
}

export default function CircleProgress({
  active,
  displayLine,
  icon,
  paddingLeft,
  children
}: CircleProp) {
  return (
    <S.CircleContainer>
      <S.CircleLine active={active} displayLine={displayLine}>
        <S.Circle active={active}>
          <S.Icon active={active} paddingLeft={paddingLeft}>
            {icon}
          </S.Icon>
        </S.Circle>
      </S.CircleLine>
      <S.CircleSubtitle active={active} displayLine={displayLine}>
        {children}
      </S.CircleSubtitle>
    </S.CircleContainer>
  )
}
