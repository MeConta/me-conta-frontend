import styled, { css } from 'styled-components'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: ${theme.spacings.medium} ${theme.spacings.xxxlarge};
    background-color: ${theme.colors.white};
  `}
`

export const OptionsContainer = styled.div`
  ${({ theme }) => css`
    font-family: ${theme.font.family};

    a {
      font-size: ${theme.font.sizes['desk-large']};
      font-weight: bold;
      line-height: 1.5rem;
      color: ${theme.colors.mineShaft};
      text-decoration: none;
      padding: 0 ${theme.spacings.medium};
    }

    button {
      margin-left: ${theme.spacings.xsmall};
    }

    @media only screen and (max-width: 1300px) {
      display: none;
    }
  `}
`
