import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local(''),
       url('/fonts/mulish-v3-latin-300.woff2') format('woff2'),
}
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local(''),
       url('/fonts/mulish-v3-latin-regular.woff2') format('woff2'),
}
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local(''),
       url('/fonts/mulish-v3-latin-700.woff2') format('woff2'),
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
      font-size: ${theme.font.sizes.medium};
    }

    button {
      cursor: pointer;
    }
  `}

  html, body, #__next {
    height: 100%;
  }
`

export default GlobalStyles
