import styled, { css } from 'styled-components'

interface SuperiorCompletoProps {
  ativo?: boolean
  errorActive?: boolean
}

export const SuperiorCompleto = styled.div<SuperiorCompletoProps>`
  opacity: ${(p) => (p.ativo ? '1' : '0')};
  max-height: ${(p) => (p.ativo ? '100vh' : '0')};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`

export const TextSplit = styled.div<Pick<SuperiorCompletoProps, 'errorActive'>>`
  ${({ errorActive }) => css`
    display: flex;
    align-items: ${errorActive ? 'baseline' : 'flex-end'};
    gap: 2rem;
    & > div:first-child {
      flex: 2;
    }

    & > div:nth-child(2) {
      flex: 1;
    }
  `}
`
