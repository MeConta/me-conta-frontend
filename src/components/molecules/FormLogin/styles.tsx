import styled, { DefaultTheme, css } from 'styled-components'

export const Form = styled.form`
  width: 100%;
`

export const Link = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.gsmall};
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
  `}
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100%;
  }
`
