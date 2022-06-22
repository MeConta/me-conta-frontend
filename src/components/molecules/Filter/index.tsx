import { useState } from 'react'
import * as S from './styles'

type FilterProps = {
  filterOptions: Array<string>
}

export default function Filter({ filterOptions }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>(filterOptions[0])

  return (
    <S.WrapperFilter>
      {filterOptions.map((filterOption, index) => (
        <S.ButtonFilter
          key={index}
          onClick={() => setActiveFilter(filterOption)}
          active={activeFilter === filterOption}
        >
          {filterOption}
        </S.ButtonFilter>
      ))}
    </S.WrapperFilter>
  )
}
