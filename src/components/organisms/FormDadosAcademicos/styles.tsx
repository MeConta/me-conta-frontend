import styled, { css } from 'styled-components'

interface SuperiorCompletoProps {
  ativo?: boolean
  errorActive?: boolean
}

export const SuperiorCompleto = styled.div<SuperiorCompletoProps>`
  opacity: ${(p) => (p.ativo ? '1' : '0')};
  max-height: ${(p) => (p.ativo ? '100vh' : '0')};
  visibility: ${(p) => (p.ativo ? 'visible' : 'hidden')};
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

    & > div:last-child {
      flex: 1;
    }

    & > div > label {
      white-space: nowrap;
    }

    @media screen and (max-width: 425px) {
      gap: 0;
      flex-direction: column;

      & > div {
        min-width: 100%;

        & > label {
          white-space: normal;
        }
      }
    }
  `}
`
