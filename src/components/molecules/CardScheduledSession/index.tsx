import * as S from './styles'
import { UserInfo } from '../UserInfo'
import { useState } from 'react'
import Collapse from '@kunukn/react-collapse'

export type CardScheduledSessionProps = {
  name: string
  email?: string
  frentes: Array<number>
  description: string
}

export function CardScheduledSession({
  name,
  email,
  frentes,
  description
}: CardScheduledSessionProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <S.Wrapper>
      <UserInfo name={name} email={email} frentes={frentes} />

      <div>
        <button onClick={() => setIsOpen((state) => !state)}>
          {' '}
          Observações para a sessão{' '}
        </button>
        <Collapse isOpen={isOpen}>
          <div className="description">{description}</div>
        </Collapse>
      </div>

      <button className="button">
        <a className="buttonLink" target="_blank" rel="noreferrer">
          Entrar na sessão
        </a>
      </button>

      <button className="cancelButton">Cancelar</button>
    </S.Wrapper>
  )
}
