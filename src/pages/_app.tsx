import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import GlobalStyle, { Main } from 'styles/global'
import {
  SignupProvider,
  SignupService
} from 'services/signup-service/signup-service'
import axios from 'axios'
import { Header } from 'components/molecules/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SignupProvider signupService={new SignupService(axios)}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Me Conta</title>
          <link rel="shortcut icon" href="/img/icon-512.png" />
          <link rel="apple-touch-icon" href="/img/icon-512.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="A simple project starter work with TypeScript, React, NextJS and Styled Components"
          />
          <meta name="theme-color" content="#06092B" />
        </Head>
        <GlobalStyle />
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </SignupProvider>
  )
}
export default MyApp
