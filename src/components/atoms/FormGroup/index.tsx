import { ReactNode, useState } from 'react'
import useDelayUnmount from 'utils/animations/unmountHelper'
import * as S from './styles'

export type FormGroupProps = {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
  name: string
  showPopover?: boolean
  popover?: ReactNode
}

export function FormGroup({
  label,
  name,
  required,
  error,
  showPopover,
  popover,
  children
}: FormGroupProps) {
  const [displayPopover, setDisplayPopover] = useState(false)
  return (
    <S.Wrapper error={error} showPopover={showPopover && displayPopover}>
      {!!label && (
        <S.Label htmlFor={name} aria-required={required} data-testid={label}>
          {label}
        </S.Label>
      )}
      <S.InputWrapper
        onFocus={() => setDisplayPopover(true)}
        onBlur={() => setDisplayPopover(false)}
      >
        {children}
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
      {useDelayUnmount(showPopover && displayPopover, 300) && popover}
    </S.Wrapper>
  )
}
