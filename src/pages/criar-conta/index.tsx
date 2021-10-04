import { FormCadastro } from 'components/molecules/FormCadastro'
import { UserType } from 'enums/user-type.enum'
import { useSignup } from 'services/signup-service/signup-service'
import * as S from './styles'

export default function CriarConta() {
  const { signupService } = useSignup()

  return (
    <S.Wrapper>
      <FormCadastro
        signupService={signupService}
        handleSuccess={(form) => {
          if (form.tipo === UserType.ALUNO) {
            alert('Deve redirecionar para Dashboard')
          } else {
            alert('Deve redirecionar para Form de Voluntario')
          }
        }}
        handleError={(error) => {
          console.log(error, error.code)
          alert('Deu Ruim!')
        }}
      />
    </S.Wrapper>
  )
}
