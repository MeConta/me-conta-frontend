import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormResetSenha } from 'components/organisms/FormResetSenha'
import router from 'next/router'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/styles'

type InitialProps = {
  hash: string
}

function NovaSenha({ hash }: InitialProps) {
  const { authService } = useAuthContext()
  const { emit } = useToast()

  return (
    <S.ComponentWrapper>
      <WrapperForm>
        <F.WrapperFields>
          <F.Paragraph
            size="desk-xxlarge"
            color="black"
            weight="bold"
            margin="xsmall"
          >
            Redefinição de senha
          </F.Paragraph>
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
    </S.ComponentWrapper>
  )
}

NovaSenha.getInitialProps = ({ query: { hash = '' } }) => {
  return { hash }
}

export default NovaSenha
