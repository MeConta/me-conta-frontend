import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormResetSenha } from 'components/organisms/FormResetSenha'
import router from 'next/router'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import * as F from '../../styles/form/styles'

type InitialProps = {
  hash: string
}

function NovaSenha({ hash }: InitialProps) {
  const { authService } = useAuthContext()
  const { emit } = useToast()

  return (
    <WrapperForm>
      <F.WrapperFields>
        <F.Header>Nova Senha</F.Header>
        <F.Subtitle>Insira abaixo sua nova senha e confirme-a:</F.Subtitle>
        <FormResetSenha
          hash={hash}
          authService={authService}
          handleSuccess={() => {
            emit({
              type: ToastType.SUCCESS,
              message: 'Senha alterada com sucesso'
            })
            router.push('/login')
          }}
          handleError={(error: BackendError) => {
            console.log(error)
            router.push('/login')
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
