import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormRecuperacaoSenha } from 'components/organisms/FormRecuperacaoSenha'
import router from 'next/router'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import * as F from '../../styles/form/styles'

export default function RecuperacaoDeSenha() {
  const { authService } = useAuthContext()

  return (
    <WrapperForm>
      <F.WrapperFields>
        <F.Header>Recuperação de Senha</F.Header>
        <F.Subtitle>
          Insira abaixo o e-mail de sua conta, você receberá novas instruções
          nele.
        </F.Subtitle>
        <FormRecuperacaoSenha
          authService={authService}
          handleSuccess={() => {
            router.push('/login')
          }}
          handleError={(error: BackendError) => {
            console.log(error)
          }}
        />
      </F.WrapperFields>
    </WrapperForm>
  )
}
