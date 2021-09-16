import * as S from './styles'
import { CgCloseR } from 'react-icons/cg'

export type SidebarProps = {
  showSidebar: boolean
  handleCloseButton: () => void
}

export function Sidebar({ showSidebar, handleCloseButton }: SidebarProps) {
  return (
    <S.Wrapper showSidebar={showSidebar}>
      <a onClick={handleCloseButton}>
        <CgCloseR color="#FFF" />
      </a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </S.Wrapper>
  )
}
