import { Toast } from 'components/atoms/Toast'
import Breadcrumb from 'components/molecules/Breadcrumb'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AuthService } from 'services/auth-services/auth-service'
import {
  SignupProvider,
  SignupService
} from 'services/signup-service/signup-service'
import { ToastProvider } from 'services/toast-service/toast-service'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { Main } from 'styles/global'
import theme from 'styles/theme'
import { api } from '../services/api/api'
import dynamic from 'next/dynamic'
import Footer from '../components/molecules/Footer'
import { AuthorizationProvider } from 'store/auth-context'
import { UserActivityContextProvider } from 'store/user-activity-context'

const HeadersDashboardNoSsr = dynamic(
  () => import('../components/molecules/HeaderDashboard'),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  const timeoutIdleMs = 10 * 60 * 1000 // 10 minutes

  return (
    <SignupProvider signupService={new SignupService(api)}>
      <AuthorizationProvider authService={new AuthService(api)}>
        <ThemeProvider theme={theme}>
          <UserActivityContextProvider
            timeoutForIdleMs={timeoutIdleMs}
            userIsIdle={false}
          >
            <ToastProvider>
              <Toast />
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
              <Main>
                <HeadersDashboardNoSsr />
                <Breadcrumb />
                <Component {...pageProps} />
                <Footer />
              </Main>
            </ToastProvider>
          </UserActivityContextProvider>
        </ThemeProvider>
      </AuthorizationProvider>
    </SignupProvider>
  )
}
export default MyApp
