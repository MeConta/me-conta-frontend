import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormAtendente } from 'components/organisms/FormAtendente'
import { useSignup } from 'services/signup-service/signup-service'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/cadastro-atendente/styles'

export default function CadastroAtendente() {
  const { signupService } = useSignup()
  return (
    <WrapperForm>
      <S.TitleContainer>
        <p>
          Estamos muito felizes com seu interesse em entrar para o time de
          voluntários Me Conta
        </p>
        <p>Por favor, preencha as informações abaixo:</p>
      </S.TitleContainer>
      <F.WrapperFields>
        <FormAtendente signupService={signupService} />
      </F.WrapperFields>
    </WrapperForm>
  )
}
