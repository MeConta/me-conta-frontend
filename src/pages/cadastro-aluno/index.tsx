import FormAluno from '../../components/organisms/FormAluno'
import { WrapperForm } from '../../components/molecules/WrapperForm'
import * as F from '../../styles/form/styles'
import { SignupAlunoService } from '../../services/signup-aluno-service/signup-aluno-service'
import { useRouter } from 'next/router'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import { api } from '../../services/api/api'

export default function CadastroAluno() {
  const router = useRouter()
  const { emit } = useToast()
  return (
    <WrapperForm>
      <F.WrapperFields>
        <F.Header>Perfil</F.Header>
        <F.Subtitle>
          Preencha as informações abaixo para marcar um atendimento:
        </F.Subtitle>
        <FormAluno
          alunoSignup={new SignupAlunoService(api)}
          handleSuccess={async () => {
            emit({
              type: ToastType.SUCCESS,
              message: 'Cadastro realizado com sucesso!'
            })
            await router.push('/dashboard-aluno')
          }}
          handleError={(error) => {
            emit({
              type: ToastType.ERROR,
              message: 'Erro ao realizar o cadastro!'
            })
            console.error(error)
          }}
        />
      </F.WrapperFields>
    </WrapperForm>
  )
}
