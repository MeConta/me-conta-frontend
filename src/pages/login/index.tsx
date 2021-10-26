import { WrapperForm } from 'components/molecules/WrapperForm'
import Link from 'next/link'
import { FormLogin } from '../../components/molecules/FormLogin'
import { useAuthService } from '../../services/auth-services/auth-service'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/login/styles'

export default function Login() {
  const { authService } = useAuthService()

  return (
    <WrapperForm>
      <F.WrapperFields>
        <F.Header>Login</F.Header>
        <FormLogin authService={authService} />
        <S.Link>
          <Link href="/recuperar-senha">
            <a>Esqueceu a senha?</a>
          </Link>
        </S.Link>
      </F.WrapperFields>
    </WrapperForm>
  )
}
