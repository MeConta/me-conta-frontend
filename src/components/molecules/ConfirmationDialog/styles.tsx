import styled from 'styled-components'

export const DivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 425px) {
    padding: 0;
    & > div {
      margin: 0;
    }
  }
`
