import ConfirmationDialog from 'components/molecules/ConfirmationDialog'
import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormResetSenha } from 'components/organisms/FormResetSenha'
import router from 'next/router'
import { useState } from 'react'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/styles'
import toggles from '../../utils/toggles/toggles'

const { enablePasswordResetModal } = toggles

type InitialProps = {
  hash: string
}

function NovaSenha({ hash }: InitialProps) {
  const { authService } = useAuthContext()
  const { emit } = useToast()
  const [successModalVisible, setSuccessModalVisible] = useState(false)

  return (
    <>
      {enablePasswordResetModal && successModalVisible && (
        <ConfirmationDialog
          titleInfo={{
            preText: 'SUA SENHA FOI REDEFINIDA COM ',
            boldText: 'SUCESSO!'
          }}
          subtitleInfo={{
            posText: 'Clique no botão abaixo para efetuar seu login'
          }}
          buttonText="ACESSAR MINHA CONTA"
          buttonLink="/login"
          isModal
          buttonColor="secondary"
        />
      )}
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
                if (enablePasswordResetModal) setSuccessModalVisible(true)
                else router.push('/login')
              }}
              handleError={(error: BackendError) => {
                console.log(error)
                router.push('/login')
              }}
            />
          </F.WrapperFields>
        </WrapperForm>
      </S.ComponentWrapper>
    </>
  )
}

NovaSenha.getInitialProps = ({ query: { hash = '' } }) => {
  return { hash }
}

export default NovaSenha
