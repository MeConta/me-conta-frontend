import styled, { css } from 'styled-components'

interface WrapperProp {
  borderPresent?: boolean
  padding?: string
}

export const Wrapper = styled.div<WrapperProp>`
  ${({ theme, borderPresent = true, padding }) => css`
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: ${borderPresent && '0.1rem solid' + theme.colors.powderAsh};
    border-radius: ${borderPresent && theme.border['btn-square-radius']};
    padding: ${padding
      ? padding
      : theme.spacings.large + ' ' + theme.spacings.xxsmall};
    max-width: 30%;
    margin: 1.5rem 0;
    a {
      margin: 0 0 2rem 0;
    }

    @media only screen and (min-width: ${theme.screen
        .small}) and (max-width: ${theme.screen.large}) {
      max-width: 50%;
    }

    @media only screen and (max-width: ${theme.screen.small}) {
      border: 0;
      max-width: 100%;
    }
  `}
`
