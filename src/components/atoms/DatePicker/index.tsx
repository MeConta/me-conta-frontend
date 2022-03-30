import * as S from './styles'

import DayPicker, { DayPickerProps } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import theme from '../../../styles/theme'

import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline
} from 'styled-icons/evaicons-outline'

type NavbarProps = {
  onPreviousClick: () => void
  onNextClick: () => void
  className: string
}

function Navbar({ onPreviousClick, onNextClick, className }: NavbarProps) {
  return (
    <div className={className}>
      <button onClick={() => onPreviousClick()} data-testid="back-button">
        <ArrowIosBackOutline />
      </button>
      <button onClick={() => onNextClick()} data-testid="forward-button">
        <ArrowIosForwardOutline />
      </button>
    </div>
  )
}

export type DatePickerProps = DayPickerProps

export function DatePicker({ ...props }) {
  const modifiersStyles = {
    selected: {
      color: theme.colors.white,
      backgroundColor: theme.colors.ceriseRed,
      boxShadow: 'inset 0px 4px 4px -2px rgba(0,0,0,0.3)'
    }
  }

  return (
    <S.Wrapper>
      <DayPicker
        locale="pt-BR"
        localeUtils={MomentLocaleUtils}
        firstDayOfWeek={1}
        modifiersStyles={modifiersStyles}
        navbarElement={Navbar}
        {...props}
      />
    </S.Wrapper>
  )
}
