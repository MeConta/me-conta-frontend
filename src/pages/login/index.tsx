import { WrapperForm } from 'components/molecules/WrapperForm'
import Link from 'next/link'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import { FormLogin } from '../../components/molecules/FormLogin'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/login/styles'

export default function Login() {
  const { authService } = useAuthContext()

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
