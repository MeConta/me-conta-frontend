import styled, { createGlobalStyle, css } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("/fonts/mulish-v3-latin-300.woff2") format('woff2');
}
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/mulish-v3-latin-regular.woff2') format('woff2')
}
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/mulish-v3-latin-700.woff2') format('woff2')
}

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smothing: grayscale;
  }

  ${({ theme }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes['desk-medium']};
    }

    button {
      cursor: pointer;
    }
  `}

  html, body, #__next {
    height: 100%;
  }
`

export const HeaderDiv = styled.div`
  width: 100%;
`

export const Main = styled.main`
  margin: 0;
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.backgroundGray};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  gap: ${(p) => p.theme.spacings.xsmall};
  & > #headCrumb {
    margin-top: -${(p) => p.theme.spacings.xsmall};
  }
  @media only screen and (max-width: 768px) {
    background-color: ${(p) => p.theme.colors.white};
  }
  @media only screen and (max-width: 480px) {
    margin: 0;
  }
`

export default GlobalStyles
