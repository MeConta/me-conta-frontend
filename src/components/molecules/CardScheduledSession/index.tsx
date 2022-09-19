import * as S from './styles'
import { UserInfo } from '../UserInfo'
import { useState } from 'react'
import Collapse from '@kunukn/react-collapse'

export type CardScheduledSessionProps = {
  name: string
  email?: string
  frentes: Array<number>
  description: string
  date: string
}

export function CardScheduledSession({
  name,
  email,
  frentes,
  description,
  date
}: CardScheduledSessionProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <S.Wrapper>
      <div className="container">
        <span className="dateContainer">{date}</span>
        <UserInfo name={name} email={email} frentes={frentes} />
        <button
          className="observation"
          onClick={() => setIsOpen((state) => !state)}
        >
          {' '}
          Observações para a sessão{' '}
        </button>
        <Collapse isOpen={isOpen}>
          <div className="description">{description}</div>
        </Collapse>

        <button className="button">
          <a className="buttonLink" target="_blank" rel="noreferrer">
            Entrar na sessão
          </a>
        </button>

        <button className="cancelButton">
          <a className="buttonLink" target="_blank" rel="noreferrer">
            Cancelar
          </a>
        </button>
      </div>
    </S.Wrapper>
  )
}
