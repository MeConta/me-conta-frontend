import { useEffect, useState } from 'react'
import * as S from './styles'

type StrengthBarProps = {
  requirements: RegExp[]
  minLength: number
  password: string
  scoreWords: string[]
  strengthColors?: string[]
}

export const StrengthBar = (props: StrengthBarProps) => {
  const [score, setScore] = useState(0)

  useEffect(() => {
    let requirementsCounter = 0

    props.requirements.forEach((regex) => {
      if (props.password.match(regex)) requirementsCounter++
    })

    setScore(requirementsCounter)
  }, [props.password, props.requirements])

  const passwordGreaterThanMinLength = props.password.length >= props.minLength

  return (
    <S.StrengthBarWrapper>
      <S.BarsWrapper>
        {props.scoreWords.map((scoreWord, index) => (
          <S.Bar
            key={index}
            active={score > index && passwordGreaterThanMinLength}
            color={
              props.strengthColors ? props.strengthColors[score - 1] : 'blue'
            }
          />
        ))}
      </S.BarsWrapper>
      <S.TextWrapper>
        {passwordGreaterThanMinLength ? (
          <S.StrengthText>{props.scoreWords[score - 1]}</S.StrengthText>
        ) : (
          <S.StrengthText>muito curta</S.StrengthText>
        )}
      </S.TextWrapper>
    </S.StrengthBarWrapper>
  )
}
