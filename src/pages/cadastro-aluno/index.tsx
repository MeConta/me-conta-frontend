import FormAluno from '../../components/organisms/FormAluno'
import { WrapperForm } from '../../components/molecules/WrapperForm'
import * as F from '../../styles/form/styles'

export default function CadastroAluno() {
  return (
    <WrapperForm>
      <F.WrapperFields>
        <F.Header>Perfil</F.Header>
        <F.Subtitle>
          Preencha as informações abaixo para marcar um atendimento:
        </F.Subtitle>
        <FormAluno />
      </F.WrapperFields>
    </WrapperForm>
  )
}
