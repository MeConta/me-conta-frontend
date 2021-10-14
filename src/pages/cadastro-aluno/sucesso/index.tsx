import * as F from '../../../styles/form/styles'
import { WrapperForm } from '../../../components/molecules/WrapperForm'
import { Button } from '../../../components/atoms/Button'
import React from 'react'
import Link from 'next/link'
import * as S from '../../../styles/pages/cadastro-aluno/sucesso/styles'

export default function AlunoSucesso() {
  return (
    <WrapperForm>
      <F.Header>Sucesso!</F.Header>
      <F.Subtitle>Conta de aluno criada com sucesso.</F.Subtitle>
      <Link href="/" passHref>
        <S.ButtonContainer>
          <Button color="primary" radius="square" size="large" as="a">
            Leve-me à Dashboard
          </Button>
        </S.ButtonContainer>
      </Link>
    </WrapperForm>
  )
}
