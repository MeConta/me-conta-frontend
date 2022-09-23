import * as S from './styles'
import { UserInfo } from '../UserInfo'
import { useState } from 'react'
import Collapse from '@kunukn/react-collapse'
import Button from '@mui/material/Button'
import { KeyboardArrowDown } from '@material-ui/icons'

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
        <Button
          variant="text"
          className="observationButton"
          sx={{
            ml: 1,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent'
            }
          }}
          disableRipple
          endIcon={<KeyboardArrowDown />}
          onClick={() => setIsOpen((state) => !state)}
        >
          {' '}
          Observações para a sessão{' '}
        </Button>
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
