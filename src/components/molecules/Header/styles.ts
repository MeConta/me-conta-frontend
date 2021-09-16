import styled, { css } from 'styled-components'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: ${theme.spacings.medium} ${theme.spacings.xxxlarge};
    background-color: ${theme.colors.white};

    .open-menu-button {
      width: 5rem;
      height: 5rem;
      display: none;
      cursor: pointer;
    }

    @media only screen and (max-width: 1300px) {
      justify-content: space-between;

      .options-container {
        display: none;
      }

      .open-menu-button {
        display: block;
      }
    }

    @media only screen and (max-width: 600px) {
      padding: ${theme.spacings.medium} ${theme.spacings.medium}
        ${theme.spacings.medium} ${theme.spacings.xxsmall};
    }
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
  `}
`
