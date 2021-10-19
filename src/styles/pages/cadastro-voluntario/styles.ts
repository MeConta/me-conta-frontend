import styled, { css } from 'styled-components'

export const TitleContainer = styled.div`
  ${({ theme }) => css`
    max-width: 80%;

    @media only screen and (min-width: 1440px) {
      width: 1280px;
    }

    p {
      text-align: center;
      color: ${theme.colors.mineShaft};
    }

    p:first-child {
      font-size: ${theme.font.sizes['desk-xlarge']};
      font-weight: bold;
    }

    p:last-child {
      font-size: ${theme.font.sizes['mob-xlarge']};
      display: block;
      padding: 2rem 0;
    }
  `}
`
