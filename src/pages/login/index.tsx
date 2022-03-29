import { WrapperForm } from 'components/molecules/WrapperForm'
import Link from 'next/link'
import { useEffect } from 'react'
import { useIdleTimerContext } from 'react-idle-timer'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import { FormLogin } from '../../components/molecules/FormLogin'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/login/styles'

export default function Login() {
  const { authService } = useAuthContext()

  const activityCtx = useIdleTimerContext()
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('*** Login *** ')
      console.log('Current Time:', new Date().toISOString())
      console.log('User is Idle: ', activityCtx.isIdle())
      console.log('Remaining Time: ', activityCtx.getRemainingTime())
      console.log('Last Active Time: ', activityCtx.getLastActiveTime())
      console.log('Last Idle Time', activityCtx.getLastIdleTime())
    }, 2000)

    return () => {
      clearTimeout(interval)
    }
  }, [])

  return (
    <WrapperForm>
      <F.WrapperFields>
        <F.Header>Login</F.Header>
        <FormLogin
          authService={authService}
          handleError={(error: BackendError) => {
            console.log(error)
          }}
        />
        <S.Link>
          <Link href="/criar-conta">
            <a>Criar conta</a>
          </Link>
        </S.Link>
        <S.Link>
          <Link href="/recuperacao-de-senha">
            <a>Esqueceu a senha?</a>
          </Link>
        </S.Link>
      </F.WrapperFields>
    </WrapperForm>
  )
}
