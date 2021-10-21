import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormVoluntario } from 'components/organisms/FormVoluntario'
import { useSignup } from 'services/signup-service/signup-service'
import * as S from '../../styles/pages/cadastro-voluntario/styles'
import * as F from '../../styles/form/styles'
import { SignupVoluntarioService } from '../../services/signup-voluntario-service/signup-voluntario-service'
import { api } from 'services/api/api'

export default function CadastroVoluntario() {
  const { signupService } = useSignup()
  return (
    <WrapperForm>
      <F.Header>
        Estamos muito felizes com seu interesse em entrar para o time de
        voluntários Me Conta!
      </F.Header>
      <F.Subtitle>Por favor, preencha as informações abaixo:</F.Subtitle>
      <F.WrapperFields>
        <FormVoluntario
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
