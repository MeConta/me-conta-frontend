import * as S from './styles'
import { FrentesInfo } from './frentesInfo'
import { useState } from 'react'

export type FrentesProps = {
  onSelectItem: (item: Frente) => void
}

interface Frente {
  id: number
  text: string
  value: string
  icon: JSX.Element
}

export default function FrentesDropdown(props: FrentesProps) {
  const frentes = FrentesInfo

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<Frente>(frentes[0])

  const toggle = () => {
    setIsOpen((prevState) => {
      return !prevState
    })
  }

  const itemSelectedHandler = (selected: Frente) => {
    setSelectedItem(selected)
    setIsOpen(false)
    props.onSelectItem(selected)
  }

  return (
    <S.Wrapper>
      <S.LabelContainer>
        <p>Especilidade:</p>
      </S.LabelContainer>

      <S.StyledDropdown onClick={toggle}>
        {selectedItem && (
          <S.OptionContainer>
            <S.Option>
              {selectedItem.icon}
              <span>{selectedItem.text}</span>
            </S.Option>
            {!isOpen ? (
              <S.StyledArrowIosDownwardOutline />
            ) : (
              <S.StyledArrowIosUpwardOutline />
            )}
          </S.OptionContainer>
        )}
      </S.StyledDropdown>

      {isOpen && (
        <S.OptionListContainer>
          <ul role="menu">
            {frentes.map((item) => (
              <li
                key={item.id}
                onClick={() => itemSelectedHandler(item)}
                role="menuitem"
              >
                <S.OptionContainer>
                  <S.Option>
                    {item.icon}
                    <span>{item.text}</span>
                  </S.Option>
                </S.OptionContainer>
              </li>
            ))}
          </ul>
        </S.OptionListContainer>
      )}
    </S.Wrapper>
  )
}
