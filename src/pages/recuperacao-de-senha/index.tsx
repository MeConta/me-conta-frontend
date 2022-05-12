import { Button } from 'components/atoms/Button'
import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormRecuperacaoSenha } from 'components/organisms/FormRecuperacaoSenha'
import { useRouter } from 'next/router'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/styles'
import * as B from '../../components/organisms/FormRecuperacaoSenha/styles'

export default function RecuperacaoDeSenha() {
  const { authService } = useAuthContext()

  const router = useRouter()

  const fazerLogin = function () {
    router.push('/login')
  }

  return (
    <S.ComponentWrapper>
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
              router.push('/login')
            }}
            handleError={(error: BackendError) => {
              console.log(error)
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
