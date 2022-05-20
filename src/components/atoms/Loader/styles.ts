import styled from 'styled-components'
import { LoaderProps } from '.'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Loader = styled.div<LoaderProps>`
  border: ${(p) => p.borderSize ?? '10px'} solid
    ${(p) => p.theme.colors.xlightGray};
  border-top: ${(p) => p.borderSize ?? '10px'} solid
    ${(p) => p.theme.colors.ceriseRed};
  border-radius: 50%;
  width: ${(p) => p.size ?? '100px'};
  height: ${(p) => p.size ?? '100px'};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
