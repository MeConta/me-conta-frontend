import styled, { css } from 'styled-components'

const screenBreakingPoint = '895px'

export const DivContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${screenBreakingPoint}) {
    span {
      font-size: 14px;
    }
  }
`

export const DivContainerCarousel = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 20px;
`
