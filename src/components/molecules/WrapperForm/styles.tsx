import styled, { css } from 'styled-components'

interface WrapperProp {
  borderPresent?: boolean
  padding?: string
  shape?: 'square'
}

const wrapperModifiers = {
  square: () => css`
    width: 42rem;
    height: auto;
    #dialog-subtitle {
      padding: 1rem;
    }
  `
}

export const Wrapper = styled.div<WrapperProp>`
  ${({ theme, borderPresent = true, padding, shape }) => css`
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: ${borderPresent && '0.1rem solid' + theme.colors.powderAsh};
    border-radius: ${borderPresent && theme.border['btn-square-radius']};
    padding: ${padding
      ? padding
      : theme.spacings.large + ' ' + theme.spacings.gsmall};
    max-width: 40%;
    width: 500px;
    a {
      margin: 0 0 1rem 0;
    }

    ${!!shape && wrapperModifiers[shape]()}

    @media only screen and (min-width: ${theme.screen
      .small}) and (max-width: ${theme.screen.large}) {
      max-width: 50%;
    }

    @media only screen and (max-width: ${theme.screen.small}) {
      border: 0;
      max-width: 500px;
      padding: 0;

      > a {
        display: none;
      }
    }
  `}
`

export const ActionItemsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
