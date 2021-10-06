import styled from 'styled-components'

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
