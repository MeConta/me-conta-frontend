import ConfirmationDialog from 'components/molecules/ConfirmationDialog'
import { WrapperForm } from 'components/molecules/WrapperForm'
import { FormResetSenha } from 'components/organisms/FormResetSenha'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import * as F from '../../styles/form/styles'
import * as S from '../../styles/pages/styles'
import { redirects } from 'utils/routes/redirects'

type InitialProps = {
  hash: string
}

function NovaSenha({ hash }: InitialProps) {
  const { authService } = useAuthContext()
  const authCtx = useAuthContext()
  const { emit } = useToast()
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [validHash, setValidHash] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    validarHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validarHash = async () => {
    try {
      await authService.validarHash(hash)
      setValidHash(true)
    } catch (e: any) {
      setError(true)
    }
  }

  useEffect(() => {
    if (authCtx.isLoggedIn && authCtx.session.type) {
      const route = authCtx.session.completeProfile
        ? redirects[+authCtx.session.type]
        : '/criar-conta'
      router.push(route)
    }
  }, [authCtx])

  const renderError = () => {
    return (
      <ConfirmationDialog
        titleInfo={{
          boldText: 'Link expirado'
        }}
        subtitle={
          <>
            <F.Paragraph color="mineShaft">
              Esse link expirou e não pode ser utilizado.
              <br />
              Por favor, verifique se:
            </F.Paragraph>
            <F.BulletMenu color="mineShaft">
              <li>O link já foi utilizado para redefinir a senha</li>
              <li>
                Você demorou mais de 24hrs para redefinir a senha e por
                segurança o link expirou
              </li>
            </F.BulletMenu>
          </>
        }
        buttonText="RECUPERAR SENHA NOVAMENTE"
        buttonLink="/recuperacao-de-senha"
        buttonColor="primary"
      />
    )
  }

  return validHash && !authCtx.isLoggedIn ? (
    <>
      {successModalVisible && (
        <ConfirmationDialog
          titleInfo={{
            preText: 'SUA SENHA FOI REDEFINIDA COM ',
            boldText: 'SUCESSO!'
          }}
          subtitleInfo={{
            posText: 'Clique no botão abaixo para efetuar seu login'
          }}
          buttonText="ACESSAR MINHA CONTA"
          buttonLink="/login"
          isModal
          buttonColor="secondary"
        />
      )}
      <S.ComponentWrapper>
        <WrapperForm>
          <F.WrapperFields>
            <F.Paragraph
              size="desk-xxlarge"
              color="black"
              weight="bold"
              margin="xsmall"
            >
              Redefinição de senha
            </F.Paragraph>
            <FormResetSenha
              hash={hash}
              authService={authService}
              handleSuccess={() => {
                emit({
                  type: ToastType.SUCCESS,
                  message: 'Senha alterada com sucesso'
                })
                setSuccessModalVisible(true)
              }}
              handleError={() => {
                router.push('/login')
              }}
            />
          </F.WrapperFields>
        </WrapperForm>
      </S.ComponentWrapper>
    </>
  ) : (
    error && !authCtx.isLoggedIn && renderError()
  )
}

NovaSenha.getInitialProps = ({ query: { hash = '' } }) => {
  return { hash }
}

export default NovaSenha
