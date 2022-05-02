import styled from 'styled-components'

export const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface CircleLineProp {
  active?: boolean
  displayLine?: boolean
}

const transitionTime = 'all 1s'

export const Circle = styled.div<CircleLineProp>`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: ${(p) => (p.active ? '#458ff6' : 'transparent')};
  border-radius: 50%;
  transition: ${transitionTime};
`

export const CircleLine = styled.div<CircleLineProp>`
  display: flex;
  width: 110px;
  height: 110px;
  background-color: transparent;
  border-radius: 50%;
  border: ${(p) => (p.displayLine ? '1px solid ' : '')};
  border-color: ${(p) => (p.active ? '#458ff6' : '#a39c9c')};
  justify-content: center;
  align-items: center;
  transition: ${transitionTime};
`

export const CircleSubtitle = styled.p<CircleLineProp>`
  width: inherit;
  color: ${(p) => (p.active ? '#458ff6' : '#a39c9c')};
  font-weight: ${(p) => p.active && p.displayLine && 'bold'};
  transition: ${transitionTime};
`
interface IconProp {
  active?: boolean
  paddingLeft?: string
}

export const Icon = styled.div<IconProp>`
  display: flex;
  order: 1;
  padding-left: ${(p) => p.paddingLeft || '0'};

  & > svg {
    width: 5rem;
    height: 100%;
    color: ${(p) => (p.active ? 'white' : '#a39c9c')};
    transition: ${transitionTime};
  }
`
