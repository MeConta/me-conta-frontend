import styled from 'styled-components'

interface SuperiorCompletoProps {
  ativo?: boolean
}

export const SuperiorCompleto = styled.div<SuperiorCompletoProps>`
  opacity: ${(p) => (p.ativo ? '1' : '0')};
  max-height: ${(p) => (p.ativo ? '100vh' : '0')};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`

export const TextSplit = styled.div`
  display: flex;
  gap: 42px;
  & > div:first-child {
    flex: 1;
  }
`
