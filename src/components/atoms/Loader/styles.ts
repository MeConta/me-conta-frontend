import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Loader = styled.div`
  ${({ theme }) => css`
    border: 10px solid ${theme.colors.xlightGray};
    border-top: 10px solid ${theme.colors.ceriseRed};
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 1s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`
