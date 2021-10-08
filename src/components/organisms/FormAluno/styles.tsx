import styled, { css } from 'styled-components'

export const Form = styled.form`
  width: 100%;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    button {
      display: flex;
    }
    button:first-child {
      margin-bottom: 1rem;
    }
  }
  button {
    display: flex;
  }
`

export const Link = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-top: 1.5rem;
    font-size: ${theme.font.sizes['desk-large']};
  `}
`
