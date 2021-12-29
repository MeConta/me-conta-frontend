import * as S from './styles'
import { FrentesInfo } from './frentesInfo'

import ReactTooltip from 'react-tooltip'

export type FrentesProps = {
  frentes: Array<Number>
}

export default function Frentes({ frentes }: FrentesProps) {
  return (
    <S.Wrapper>
      {FrentesInfo.filter((item) => frentes.includes(item.value)).map((obj) => {
        return (
          <div data-tip data-for={obj.id} key={obj.id}>
            <ReactTooltip id={obj.id}> {obj.text} </ReactTooltip>
            {obj.icon}
          </div>
        )
      })}
    </S.Wrapper>
  )
}
