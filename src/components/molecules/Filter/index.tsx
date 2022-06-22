import { useState } from 'react'
import * as S from './styles'

type FilterProps = {
  filterOptions: Array<string>
  handleClick: Function
}

export default function Filter({ filterOptions, handleClick }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>(filterOptions[0])

  return (
    <S.WrapperFilter>
      {filterOptions.map((filterOption, index) => (
        <S.ButtonFilter
          key={index}
          onClick={() => {
            setActiveFilter(filterOption)
            handleClick(filterOption)
          }}
          active={activeFilter === filterOption}
        >
          {filterOption}
        </S.ButtonFilter>
      ))}
    </S.WrapperFilter>
  )
}
