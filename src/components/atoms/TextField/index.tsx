import { ChangeEvent } from 'react'
import { InputHTMLAttributes, useState } from 'react'
import * as S from './styles'
// import { EyeFill } from '@styled-icons/bootstrap'

export type Props = {
  label?: string
  inputChange?: (value:string)=>void
  initialValue?: string
} & InputHTMLAttributes<HTMLInputElement>

export function TextInput({ label, name, initialValue = '', inputChange, ...props }: Props) {
  const [value, setValue] = useState(initialValue)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    {inputChange && inputChange(e.currentTarget.value)}
  }

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <S.Input
          value={value}
          onChange={onChange}
          name={name}
          {...(label ? { id: name } : {})}
          {...props}
        />
      </div>
    </div>
  )
}
