import { useRouter } from 'next/router'
import { FormCadastro } from 'components/molecules/FormCadastro'
import { UserType } from 'enums/user-type.enum'
import { useSignup } from 'services/signup-service/signup-service'
import * as S from './styles'

export default function CriarConta() {
  const { signupService } = useSignup()
  const router = useRouter()

  return (
    <S.Wrapper>
      <FormCadastro
        signupService={signupService}
        handleSuccess={(form) => {
          if (form.tipo === UserType.ALUNO) {
            router.push('/cadastro-aluno')
          } else {
            router.push('/cadastro-atendente')
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
