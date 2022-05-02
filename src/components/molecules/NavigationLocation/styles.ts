import styled from 'styled-components'

export const ComponentContainer = styled.div`
  display: flex;
`

interface LineProp {
  active?: boolean
}

export const Line = styled.div<LineProp>`
  width: 60px;
  height: 1px;
  border: 1px solid ${(p) => (p.active ? '#458ff6' : '#a39c9c')};
  background-color: ${(p) => (p.active ? '#458ff6' : '#a39c9c')};
  margin: 55px 4px 0;
  border-radius: 50%;
  transition: all 1.5s;
`
