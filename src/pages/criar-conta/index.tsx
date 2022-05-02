import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FormCadastro } from 'components/organisms/FormCadastro'
import { UserType } from 'enums/user-type.enum'
import { useSignup } from 'services/signup-service/signup-service'
import { WrapperForm } from '../../components/molecules/WrapperForm'
import * as P from '../../styles/pages/styles'
import * as F from '../../styles/form/styles'
import { Button } from 'components/atoms/Button'
import FormDadosPessoais from 'components/organisms/FormDadosPessoais'
import { PassosCadastro } from '../../enums/passos-cadastro.enum'
import NavigationLocation from 'components/molecules/NavigationLocation'

export default function CriarConta() {
  const { signupService } = useSignup()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState<PassosCadastro>(
    PassosCadastro.CRIAR_CONTA
  )
  const [, setDadosPessoais] = useState<Object>({})
  const toggleFormSteps = true

  const redirectAccordingToUserType = async (type: UserType) => {
    if (type === UserType.ALUNO) {
      await router.push('/cadastro-aluno')
    } else {
      await router.push('/cadastro-voluntario')
    }
  }

  const handleSuccess = async (type: UserType) => {
    if (!toggleFormSteps) {
      await redirectAccordingToUserType(type)
    } else setCurrentStep(PassosCadastro.DADOS_PESSOAIS)
  }

  const redirectToLogin = function () {
    router.push('/login')
  }

  const [tipoDeUsuario, setTipoDeUsuario] = useState(UserType.ALUNO)

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
                await handleSuccess(form.tipo)
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
            >
              ENTRAR
            </Button>
          </F.WrapperFields>
        )
      case PassosCadastro.DADOS_PESSOAIS:
        return (
          <FormDadosPessoais
            setDadosRegistro={setDadosPessoais}
            setNextStep={setCurrentStep}
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
