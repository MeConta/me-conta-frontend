import styled from 'styled-components'

export const DivContainer = styled.div`
  background-color: ${(p) => p.theme.colors.backgroundGray};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 113px 0;

  @media screen and (max-width: 425px) {
    padding: 0;
    & > div {
      margin: 0;
    }
  }
`
