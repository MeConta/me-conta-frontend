import * as S from './styles'

import { CardVoluntario } from '../CardVoluntario'
import { DateSelect } from '../DateSelect'

export type CardAgendamentoProps = {
  name: string
  email?: string
  profileLink?: string
  frentes: Array<number>
  title: string
  description: string
  onChange: (value: Date) => void
  availability: Date[][]
}

export function CardAgendamento({
  name,
  email,
  profileLink,
  frentes,
  title,
  description,
  availability,
  onChange
}: CardAgendamentoProps) {
  return (
    <S.Wrapper>
      <CardVoluntario
        name={name}
        email={email}
        profileLink={profileLink}
        frentes={frentes}
        title={title}
        description={description}
      />

      <S.DateWrapper>
        <DateSelect availability={availability} onChange={onChange} />
      </S.DateWrapper>
    </S.Wrapper>
  )
}
