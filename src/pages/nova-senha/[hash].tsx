import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormResetSenha } from 'components/organisms/FormResetSenha'
import router from 'next/router'
import { BackendError } from 'types/backend-error'
import { useAuthService } from '../../services/auth-services/auth-service'
import * as F from '../../styles/form/styles'

type InitialProps = {
  hash: string
}

function NovaSenha({ hash }: InitialProps) {
  const { authService } = useAuthService()

  return (
    <WrapperForm>
      <F.WrapperFields>
        <F.Header>Nova Senha</F.Header>
        <F.Subtitle>Insira abaixo sua nova senha e confirme-a:</F.Subtitle>
        <FormResetSenha
          hash={hash}
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

NovaSenha.getInitialProps = ({ query: { hash = '' } }) => {
  return { hash }
}

export default NovaSenha
