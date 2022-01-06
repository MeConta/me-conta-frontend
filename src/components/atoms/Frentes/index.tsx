import * as S from './styles'
import { FrentesInfo } from './frentesInfo'

import ReactTooltip from 'react-tooltip'

export type FrentesProps = {
  frentes: Array<Number>
}

export default function Frentes({ frentes }: FrentesProps) {
  return (
    <S.Wrapper>
      {FrentesInfo.filter((item) => frentes.includes(item.id)).map((obj) => (
        <div data-tip data-for={obj.value} key={obj.value}>
          <ReactTooltip id={obj.value}> {obj.text} </ReactTooltip>
          {obj.icon}
        </div>
      ))}
    </S.Wrapper>
  )
}
