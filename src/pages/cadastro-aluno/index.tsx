import FormAluno from '../../components/organisms/FormAluno'
import { WrapperForm } from '../../components/molecules/WrapperForm'
import * as F from '../../styles/form/styles'

export default function CadastroAluno() {
  return (
    <WrapperForm>
      <F.WrapperFields>
        <FormAluno />
      </F.WrapperFields>
    </WrapperForm>
  )
}
