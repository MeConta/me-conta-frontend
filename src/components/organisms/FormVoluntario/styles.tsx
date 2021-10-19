import styled, { css, DefaultTheme } from 'styled-components'

export const Form = styled.form`
  width: 100%;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 50%;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }
`

export const Title = styled.p`
  ${({ theme }) => css`
    justify-content: center;
    text-align: left;
    display: flex;
    padding-bottom: 1rem;
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-large']};
    font-style: ${theme.font.light};
  `}
`
