import { WrapperForm } from 'components/molecules/WrapperForm'
import { BackendError } from 'types/backend-error'
import { FormLogin } from '../../components/molecules/FormLogin'
import { Button } from 'components/atoms/Button'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/styles'
import { useRouter } from 'next/router'
import { useAuthContext } from 'store/auth-context'
import { useEffect, useState } from 'react'
import { redirects } from 'utils/routes/redirects'
import Loader from '../../components/atoms/Loader'

export default function Login() {
  const router = useRouter()
  const authCtx = useAuthContext()
  const [renderLogin, setRenderLogin] = useState<boolean>(false)

  const criarConta = function () {
    router.push('/criar-conta')
  }

  useEffect(() => {
    if (!authCtx.isLoggedIn) setRenderLogin(true)

    if (authCtx.isLoggedIn && authCtx.session.type) {
      const route = authCtx.session.completeProfile
        ? redirects[+authCtx.session.type]
        : '/criar-conta'
      router.push(route)
    }
  }, [authCtx, router])

  return renderLogin ? (
    <S.ComponentWrapper>
      <WrapperForm>
        <F.WrapperFields>
          <F.Paragraph size="desk-xlarge" color="black" margin="xsmall">
            Faça seu <F.BoldParagraph>login</F.BoldParagraph> e comece seu
            atendimento!
          </F.Paragraph>
          <FormLogin
            handleError={(error: BackendError) => {
              console.log(error)
            }}
          />
          <F.Paragraph margin="xsmall">
            Quer fazer parte do Me Conta?
          </F.Paragraph>
          <Button
            radius="square"
            onClick={criarConta}
            type="submit"
            color="negative"
            size="mediumLarge"
          >
            CRIE SUA CONTA
          </Button>
        </F.WrapperFields>
      </WrapperForm>
    </S.ComponentWrapper>
  ) : (
    <Loader />
  )
}
