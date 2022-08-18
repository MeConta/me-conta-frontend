import * as S from './styles'

import DayPicker, { DayPickerProps } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import theme from '../../../styles/theme'
import 'moment/locale/pt-br'

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

export function DatePicker(props: DatePickerProps) {
  const modifiersStyles = {
    selected: {
      color: theme.colors.white,
      fontWeight: theme.font.bold,
      backgroundColor: theme.colors.ceriseRed,
      boxShadow: 'inset 0px 4px 4px -2px rgba(0,0,0,0.3)'
    },
    outside: {
      boxShadow: 'inset 0px 8px 6px -6px #cecece',
      backgroundColor: '#FCFCFC'
    }
  }

  return (
    <S.Wrapper>
      <DayPicker
        {...props}
        localeUtils={MomentLocaleUtils}
        firstDayOfWeek={1}
        modifiersStyles={modifiersStyles}
        navbarElement={Navbar}
        showOutsideDays={true}
      />
    </S.Wrapper>
  )
}
