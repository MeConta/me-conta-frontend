import React from 'react'
import { WrapperForm } from '../../../components/molecules/WrapperForm'
import { Button } from '../../../components/atoms/Button'
import Link from 'next/link'
import * as F from '../../../styles/form/styles'
import * as S from '../../../styles/pages/cadastro-aluno/sucesso/styles'

const SucessoVoluntario = () => {
  return (
    <WrapperForm>
      <F.Header>
        Muito Obrigado! <br /> Sua inscrição foi concluida com sucesso!
      </F.Header>
      <br />
      <F.Subtitle>
        Nossa equipe analisará suas informações e <br /> assim que possível
        entrará em contato
      </F.Subtitle>
      <br />
      <Link href="/" passHref>
        <S.ButtonContainer>
          <Button color="primary" radius="square" size="large" as="a">
            Voltar a página inicial
          </Button>
        </S.ButtonContainer>
      </Link>
    </WrapperForm>
  )
}

export default SucessoVoluntario
