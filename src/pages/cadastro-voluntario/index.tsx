import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormVoluntario } from 'components/organisms/FormVoluntario'
import * as F from '../../styles/form/styles'
import { SignupVoluntarioService } from '../../services/signup-voluntario-service/signup-voluntario-service'
import { api } from 'services/api/api'
import { BackendError } from 'types/backend-error'
import { useRouter } from 'next/router'
import { ToastType, useToast } from 'services/toast-service/toast-service'

export default function CadastroVoluntario() {
  const router = useRouter()
  const { emit } = useToast()
  return (
    <WrapperForm>
      <F.Header>
        Estamos muito felizes com seu interesse em entrar <br /> para o time de
        voluntários do Me Conta!
      </F.Header>
      <F.Subtitle>Por favor, preencha as informações abaixo:</F.Subtitle>
      <F.WrapperFields>
        <FormVoluntario
          handleSuccess={async () => {
            await router.push('/cadastro-voluntario/sucesso')
            emit(ToastType.SUCCESS, 'Cadastro realizado com sucesso!')
          }}
          handleError={(error: BackendError) => {
            emit(ToastType.ERROR, 'Erro ao realizar o cadastro!')
            console.log(error)
          }}
          signupVoluntarioService={new SignupVoluntarioService(api)}
        />
      </F.WrapperFields>
      <br />
      <F.Footer>
        <p>
          <strong>* Supervisor: </strong>Cada supervisor(a) do Me Conta?
          monitorará de 3 a 5 estudantes de Psicologia da nossa organização,
          garantindo que estes estão prestando um bom apoio aos jovens
          brasileiros. Para se candidatar, você deverá ser graduado em
          Psicologia e possuir CRP ativo
        </p>
        <br />
        <p>
          <strong>** Atendente: </strong>
          Nossos atendentes são quem prestarão os serviços aos alunos do Ensino
          Médio. Para entrar para essa rede, você deverá ser universitário de
          Psicologia ou psicólogo formado. Caso seja um psicólogo formado com
          anos de experiência, você não terá acesso a um mentor.
        </p>
      </F.Footer>
    </WrapperForm>
  )
}
