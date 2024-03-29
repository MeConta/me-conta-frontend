import { useState } from 'react'
import { useRouter } from 'next/router'
import { FormCadastro } from 'components/organisms/FormCadastro'
import { UserType } from 'enums/user-type.enum'
import { useSignup } from 'services/signup-service/signup-service'
import { WrapperForm } from '../../components/molecules/WrapperForm'
import * as P from '../../styles/pages/styles'
import * as F from '../../styles/form/styles'
import { Button } from 'components/atoms/Button'
import FormDadosPessoais from 'components/organisms/FormDadosPessoais'
import FormDadosEscolares from 'components/organisms/FormDadosEscolares'
import FormDadosAcademicos from 'components/organisms/FormDadosAcademicos'
import { PassosCadastro } from '../../enums/passos-cadastro.enum'
import { DadosPessoaisValues, DadosEscolaresValues } from 'types/dados-cadastro'
import { SignupAlunoService } from 'services/signup-aluno-service/signup-aluno-service'
import { api } from '../../services/api/api'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import { BackendError } from 'types/backend-error'
import { DadosAcademicosValues } from 'components/organisms/FormDadosAcademicos/values-type'
import { SignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'
import { useAuthContext } from '../../store/auth-context'
import { criarContaRouter } from '../../utils/routes/criarContaRouter'

type CriarContaProps = {
  setCurrentStep: any
  setTipoDeUsuario: any
  currentStep: PassosCadastro
  tipoDeUsuario: UserType
}

function CriarConta({
  currentStep,
  setCurrentStep,
  tipoDeUsuario,
  setTipoDeUsuario
}: CriarContaProps) {
  const { signupService } = useSignup()
  const { emit } = useToast()
  const router = useRouter()

  const dadosPessoaisDefault: DadosPessoaisValues = {
    telefone: '',
    dataNascimento: '',
    UF: '',
    cidade: '',
    genero: 'ND'
  }

  const authCtx = useAuthContext()

  const [dadosPessoais, setDadosPessoais] =
    useState<DadosPessoaisValues>(dadosPessoaisDefault)
  const [dadosEscolares, setDadosEscolares] = useState<
    DadosEscolaresValues | undefined
  >()
  const [dadosAcademicos, setDadosAcademicos] = useState<
    DadosAcademicosValues | undefined
  >()

  const handleSuccessCriarConta = () => {
    setCurrentStep(PassosCadastro.DADOS_PESSOAIS)
  }

  const handleSuccessCadastro = async (tipoUsuario: UserType) => {
    const redirectRoute =
      tipoUsuario === UserType.ALUNO
        ? '/dashboard-aluno'
        : '/dashboard-atendente'

    await router.push(redirectRoute)
    authCtx.setCompleteProfile(true)

    emit({
      type: ToastType.SUCCESS,
      message: 'Cadastro realizado com sucesso!'
    })
  }

  const handleError = (error: BackendError) => {
    emit({
      type: ToastType.ERROR,
      message: 'Erro ao realizar o cadastro!'
    })
    console.error(error)
  }

  const redirectToLogin = function () {
    router.push('/login')
  }

  const renderTitleAccordingToStep = () => {
    switch (currentStep) {
      case PassosCadastro.CRIAR_CONTA:
        return (
          <F.Paragraph size="desk-xlarge" color="black">
            <F.BoldParagraph>Criar Conta</F.BoldParagraph>
          </F.Paragraph>
        )
      case PassosCadastro.DADOS_PESSOAIS:
        return (
          <F.Paragraph size="desk-xlarge" color="black">
            Complete seus <F.BoldParagraph>Dados Pessoais</F.BoldParagraph>
          </F.Paragraph>
        )
      case PassosCadastro.DADOS_ACADEMICOS:
        return (
          <F.Paragraph size="desk-xlarge" color="black">
            Complete seus{' '}
            <F.BoldParagraph>
              Dados{' '}
              {tipoDeUsuario === UserType.ALUNO ? 'Escolares' : 'Acadêmicos'}
            </F.BoldParagraph>
          </F.Paragraph>
        )
    }
  }

  const renderFormAccordingToStep = () => {
    switch (currentStep) {
      case PassosCadastro.CRIAR_CONTA:
        return (
          <F.WrapperFields>
            <FormCadastro
              setTipoDeUsuario={setTipoDeUsuario}
              signupService={signupService}
              handleSuccess={handleSuccessCriarConta}
              handleError={(error) => {
                console.error(error)
              }}
            />
            <F.Paragraph margin="xsmall">Já possui uma conta?</F.Paragraph>
            <Button
              radius="square"
              type="submit"
              color="negative"
              size="mediumLarge"
              onClick={redirectToLogin}
              textTransform="uppercase"
            >
              Entrar
            </Button>
          </F.WrapperFields>
        )
      case PassosCadastro.DADOS_PESSOAIS:
        return (
          <FormDadosPessoais
            valoresIniciais={dadosPessoais}
            setDadosPessoais={setDadosPessoais}
            setNextStep={setCurrentStep}
          />
        )
      case PassosCadastro.DADOS_ACADEMICOS:
        return tipoDeUsuario === UserType.ALUNO ? (
          <FormDadosEscolares
            alunoSignup={new SignupAlunoService(api)}
            dadosPessoais={dadosPessoais}
            handleSuccess={() => handleSuccessCadastro(UserType.ALUNO)}
            handleError={handleError}
            setCurrentStep={setCurrentStep}
            previousValues={dadosEscolares}
            setPreviousValues={setDadosEscolares}
          />
        ) : (
          <FormDadosAcademicos
            signupVoluntarioService={new SignupVoluntarioService(api)}
            dadosPessoais={dadosPessoais}
            handleSuccess={() => handleSuccessCadastro(UserType.ATENDENTE)}
            handleError={handleError}
            setCurrentStep={setCurrentStep}
            previousValues={dadosAcademicos}
            setPreviousValues={setDadosAcademicos}
          />
        )
    }
  }

  return (
    <P.ComponentWrapper>
      <WrapperForm
        title={renderTitleAccordingToStep()}
        passoCadastro={currentStep}
        tipoDeUsuario={tipoDeUsuario}
      >
        {renderFormAccordingToStep()}
      </WrapperForm>
    </P.ComponentWrapper>
  )
}

export default criarContaRouter(CriarConta)
