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
    <S.CircleContainer data-testid="circleContainer">
      <S.CircleLine
        active={active}
        displayLine={displayLine}
        data-testid="circleLine"
      >
        <S.Circle active={active} data-testid="circle">
          <S.Icon
            active={active}
            paddingLeft={paddingLeft}
            data-testid="circleIcon"
          >
            {icon}
          </S.Icon>
        </S.Circle>
      </S.CircleLine>
      <S.CircleSubtitle
        active={active}
        displayLine={displayLine}
        data-testid="circleSubtitle"
      >
        {children}
      </S.CircleSubtitle>
    </S.CircleContainer>
  )
}
