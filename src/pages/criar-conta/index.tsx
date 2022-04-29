import { useRouter } from 'next/router'
import { FormCadastro } from 'components/organisms/FormCadastro'
import { UserType } from 'enums/user-type.enum'
import { useSignup } from 'services/signup-service/signup-service'
import { WrapperForm } from '../../components/molecules/WrapperForm'
import * as P from '../../styles/pages/styles'
import * as F from '../../styles/form/styles'
import { Button } from 'components/atoms/Button'

export default function CriarConta() {
  const { signupService } = useSignup()
  const router = useRouter()

  const handleSuccess = async (type: UserType) => {
    if (type === UserType.ALUNO) {
      await router.push('/cadastro-aluno')
    } else {
      await router.push('/cadastro-voluntario')
    }
  }

  const redirectToLogin = function () {
    router.push('/login')
  }

  return (
    <P.ComponentWrapper>
      <WrapperForm>
        <F.WrapperFields>
          <F.Paragraph size="desk-xlarge" color="black">
            <F.BoldParagraph>Criar Conta</F.BoldParagraph>
          </F.Paragraph>
          <FormCadastro
            signupService={signupService}
            handleSuccess={async (form) => {
              await handleSuccess(form.tipo)
            }}
            handleError={(error) => {
              console.error(error)
            }}
          />
          <F.Paragraph margin="xsmall">Já possui uma conta?</F.Paragraph>
          <Button
            radius="square"
            type="submit"
            color="negative"
            size="mediumLarge"
            onClick={redirectToLogin}
          >
            ENTRAR
          </Button>
        </F.WrapperFields>
      </WrapperForm>
    </P.ComponentWrapper>
  )
}
