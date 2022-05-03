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
import { PassosCadastro } from '../../enums/passos-cadastro.enum'
import { DadosPessoaisValues } from 'types/dados-cadastro'
import { SignupAlunoService } from 'services/signup-aluno-service/signup-aluno-service'
import { api } from '../../services/api/api'
import { ToastType, useToast } from '../../services/toast-service/toast-service'
import { BackendError } from 'types/backend-error'

export default function CriarConta() {
  const { signupService } = useSignup()
  const { emit } = useToast()
  const router = useRouter()

  const [tipoDeUsuario, setTipoDeUsuario] = useState(UserType.ALUNO)
  const [currentStep, setCurrentStep] = useState<PassosCadastro>(
    PassosCadastro.CRIAR_CONTA
  )
  const [dadosPessoais, setDadosPessoais] =
    useState<DadosPessoaisValues | null>(null)
  const toggleFormSteps = true

  const redirectAccordingToUserType = async (type: UserType) => {
    if (type === UserType.ALUNO) {
      await router.push('/cadastro-aluno')
    } else {
      await router.push('/cadastro-voluntario')
    }
  }

  const handleSuccessCriarConta = async (type: UserType) => {
    if (!toggleFormSteps) {
      await redirectAccordingToUserType(type)
    } else setCurrentStep(PassosCadastro.DADOS_PESSOAIS)
  }

  const handleSuccessCadastroAluno = async () => {
    emit({
      type: ToastType.SUCCESS,
      message: 'Cadastro realizado com sucesso!'
    })
    await router.push('/dashboard-aluno')
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
              handleSuccess={async (form) => {
                await handleSuccessCriarConta(form.tipo)
              }}
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
            setDadosRegistro={setDadosPessoais}
            setNextStep={setCurrentStep}
          />
        )
      case PassosCadastro.DADOS_ACADEMICOS:
        return tipoDeUsuario === UserType.ALUNO ? (
          <FormDadosEscolares
            alunoSignup={new SignupAlunoService(api)}
            dadosPessoais={dadosPessoais}
            handleSuccess={handleSuccessCadastroAluno}
            handleError={handleError}
            setPreviousStep={setCurrentStep}
          />
        ) : (
          <></>
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
