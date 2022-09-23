import * as S from './styles'
import { VolunteerInfo } from '../VolunteerInfo'
import { useState } from 'react'
import Collapse from '@kunukn/react-collapse'
import Button from '@mui/material/Button'
import { KeyboardArrowDown } from '@material-ui/icons'
import moment from 'moment'
import 'moment/locale/pt-br'
import { capitalizeFirstLetter } from '../../../utils/format-string/helpers'
import { AiOutlineClockCircle } from 'react-icons/ai'

export type CardScheduledSessionProps = {
  name: string
  email?: string
  frentes: Array<number>
  description: string
  date: string
}

function MomentLocale(date: string) {
  moment.locale('pt-br')
  return (
    capitalizeFirstLetter(moment(date).format('dddd').substring(0, 3)) +
    ',' +
    ' ' +
    capitalizeFirstLetter(moment(date).format('DD [ de] MMM - HH:mm'))
  )
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
        <span className="dateContainer">
          <AiOutlineClockCircle color="#84848c" />
          {MomentLocale(date)}
        </span>
        <VolunteerInfo name={name} email={email} frentes={frentes} />
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
