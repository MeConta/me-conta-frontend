import { WrapperForm } from 'components/molecules/WrapperForm'
import { BackendError } from 'types/backend-error'
import { FormLogin } from '../../components/molecules/FormLogin'
import { Button } from 'components/atoms/Button'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/styles'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const criarConta = function () {
    router.push('/criar-conta')
  }

  return (
    <S.ComponentWrapper>
      <WrapperForm>
        <F.WrapperFields>
          <F.Paragraph size="desk-xlarge">
            Faça seu login e comece seu atendimento!
          </F.Paragraph>
          <FormLogin
            handleError={(error: BackendError) => {
              console.log(error)
            }}
          />
          <F.Paragraph>Quer fazer parte do Me Conta?</F.Paragraph>
          <Button
            radius="square"
            onClick={criarConta}
            type="submit"
            color="secondary"
            css={`
              background-color: transparent;
              border: 1px solid;
              color: #de3163;
              &:hover {
                background-color: transparent;
              }
            `}
          >
            CRIE SUA CONTA
          </Button>
        </F.WrapperFields>
      </WrapperForm>
    </S.ComponentWrapper>
  )
}
