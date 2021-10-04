import { useRouter } from 'next/router'
import { FormCadastro } from 'components/molecules/FormCadastro'
import { UserType } from 'enums/user-type.enum'
import { useSignup } from 'services/signup-service/signup-service'
import { WrapperForm } from '../../components/molecules/WrapperForm'
import * as S from '../../styles/pages/criar-conta/styles'
import Link from 'next/link'

export default function CriarConta() {
  const { signupService } = useSignup()
  const router = useRouter()
  return (
    <WrapperForm>
      <S.WrapperFields>
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
        <S.Link>
          Já possui uma conta? &nbsp;
          <Link href="/login">
            <a>Entrar</a>
          </Link>
          .
        </S.Link>
      </S.WrapperFields>
    </WrapperForm>
  )
}
