import styled from 'styled-components'

export const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 9rem;
  max-width: 11rem;
`

interface CircleLineProp {
  active?: boolean
  displayLine?: boolean
}

const transitionTime = 'all 1s'

export const Circle = styled.div<CircleLineProp>`
  display: flex;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  background-color: ${(p) =>
    p.active ? p.theme.colors.cornflowerBlue : p.theme.colors.transparent};
  border-radius: 50%;
  transition: ${transitionTime};
`

export const CircleLine = styled.div<CircleLineProp>`
  display: flex;
  width: 8rem;
  height: 8rem;
  background-color: ${(p) => p.theme.colors.transparent};
  border-radius: 50%;
  border: ${(p) => (p.displayLine ? '1px solid ' : '')};
  border-color: ${(p) =>
    p.active ? p.theme.colors.cornflowerBlue : p.theme.colors.spanishGray};
  justify-content: center;
  align-items: center;
  transition: ${transitionTime};
`

export const CircleSubtitle = styled.p<CircleLineProp>`
  width: inherit;
  color: ${(p) =>
    p.active ? p.theme.colors.cornflowerBlue : p.theme.colors.spanishGray};
  font-weight: ${(p) => p.active && p.displayLine && p.theme.font.bold};
  font-size: ${(p) => p.theme.font.sizes['desk-large']};
  text-align: center;
  transition: ${transitionTime};
`

interface IconProp {
  active?: boolean
  paddingLeft?: string
}

export const Icon = styled.div<IconProp>`
  display: flex;
  order: 1;
  padding-left: ${(p) => p.paddingLeft || p.theme.zero};

  & > svg {
    width: 4rem;
    height: 100%;
    color: ${(p) =>
      p.active ? p.theme.colors.white : p.theme.colors.spanishGray};
    transition: ${transitionTime};
  }
`
