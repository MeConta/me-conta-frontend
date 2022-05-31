import { UserType } from 'enums/user-type.enum'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'store/auth-context'
import { redirects } from 'utils/routes/redirects'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import Loader from 'components/atoms/Loader'

interface CriarContaProps {
  currentStep: PassosCadastro
  setCurrentStep: any
  tipoDeUsuario: UserType
  setTipoDeUsuario: any
}

export const criarContaRouter = (CriarContaPage: NextPage<CriarContaProps>) => {
  const CriarContaRouter = () => {
    const authCtx = useAuthContext()
    const router = useRouter()
    const { emit } = useToast()

    const [tipoDeUsuario, setTipoDeUsuario] = useState(
      +authCtx.session.type ?? UserType.ALUNO
    )
    const [currentStep, setCurrentStep] = useState<PassosCadastro>(
      PassosCadastro.CRIAR_CONTA
    )

    const userStatus = {
      INCOMPLETE_PROFILE:
        authCtx.isLoggedIn && !authCtx.session.completeProfile,
      COMPLETE_PROFILE: authCtx.isLoggedIn && authCtx.session.completeProfile,
      NOT_LOGGED_IN:
        currentStep !== PassosCadastro.CRIAR_CONTA && !authCtx.isLoggedIn
    }

    useEffect(() => {
      const redirectToDashboard = () => {
        const route = redirects[+authCtx.session.type]
        router.push(route)
      }

      if (userStatus.COMPLETE_PROFILE) {
        redirectToDashboard()
      } else if (userStatus.INCOMPLETE_PROFILE) {
        setCurrentStep(PassosCadastro.DADOS_PESSOAIS)
        setTipoDeUsuario(+authCtx.session.type)
      }
    }, [
      authCtx,
      router,
      userStatus.COMPLETE_PROFILE,
      userStatus.INCOMPLETE_PROFILE
    ])

    useEffect(() => {
      if (userStatus.NOT_LOGGED_IN) {
        emit({
          type: ToastType.WARNING,
          message: 'Sessão expirada. Realize login para concluir o cadastro!',
          autoClose: false
        })
        router.push('/login')
      }
    }, [currentStep, emit, router, userStatus.NOT_LOGGED_IN])

    return userStatus.COMPLETE_PROFILE ? (
      <Loader />
    ) : (
      <CriarContaPage
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        tipoDeUsuario={tipoDeUsuario}
        setTipoDeUsuario={setTipoDeUsuario}
      />
    )
  }

  return CriarContaRouter
}
