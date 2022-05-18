import styled from 'styled-components'

export const ComponentContainer = styled.div`
  display: flex;
  max-width: 100%;
  padding: ${(p) => p.theme.zero} ${(p) => p.theme.spacings.small};
  margin: ${(p) => p.theme.spacings.xsmall} ${(p) => p.theme.zero};
  @media (max-width: 768px) {
    padding: ${(p) => p.theme.zero};
  }
`

interface LineProp {
  active?: boolean
}

export const Line = styled.div<LineProp>`
  width: 60px;
  height: 1px;
  border: 1px solid
    ${(p) =>
      p.active ? p.theme.colors.cornflowerBlue : p.theme.colors.spanishGray};
  background-color: ${(p) =>
    p.active ? p.theme.colors.cornflowerBlue : p.theme.colors.spanishGray};
  margin-top: ${(p) => p.theme.spacings.large};
  transition: all 1.5s;
  @media (max-width: 768px) {
    max-width: 5vw;
  }
`
