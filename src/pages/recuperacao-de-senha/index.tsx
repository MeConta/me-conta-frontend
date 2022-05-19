import { Button } from 'components/atoms/Button'
import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormRecuperacaoSenha } from 'components/organisms/FormRecuperacaoSenha'
import { useRouter } from 'next/router'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/styles'
import * as B from '../../components/organisms/FormRecuperacaoSenha/styles'
import { useState } from 'react'
import ConfirmationDialog from '../../components/molecules/ConfirmationDialog'
export default function RecuperacaoDeSenha() {
  const { authService } = useAuthContext()

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const fazerLogin = function () {
    router.push('/login')
  }

  const fazerReload = () => {
    router.reload()
  }

  return (
    <S.ComponentWrapper>
      {showModal && (
        <ConfirmationDialog
          isModal={true}
          titleInfo={{ boldText: 'E-mail não enviado' }}
          buttonColor="secondary"
          buttonAction={fazerReload}
          subtitleInfo={{
            preText:
              'Ocorreu um problema ao fazer o envio do e-mail. Por favor, atualize o navegador e tente novamente.'
          }}
          buttonText={'TENTAR NOVAMENTE'}
        />
      )}
      <WrapperForm>
        <F.WrapperFields>
          <F.Paragraph size="desk-xxlarge" color="black" weight="bold">
            Recuperação de senha
          </F.Paragraph>
          <F.Paragraph margin="xsmall" color="mineShaft">
            Insira seu e-mail abaixo e enviaremos as instruções para que você
            possa redefinir sua senha.
          </F.Paragraph>
          <FormRecuperacaoSenha
            authService={authService}
            handleSuccess={() => {
              router.push('/recuperacao-de-senha-email')
            }}
            handleError={(error: BackendError) => {
              console.log(error)
              if (error.code === 500) setShowModal(true)
            }}
          />
          <F.Paragraph margin="xsmall" color="lightGray">
            Quer fazer login?
          </F.Paragraph>
          <B.ButtonContainer>
            <Button
              radius="square"
              onClick={fazerLogin}
              type="submit"
              color="negative"
              size="mediumLarge"
            >
              ACESSAR MINHA CONTA
            </Button>
          </B.ButtonContainer>
        </F.WrapperFields>
      </WrapperForm>
    </S.ComponentWrapper>
  )
}
