import styled, { css } from 'styled-components'

export const ComponentWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: ${theme.colors.backgroundGray};
  `}
`
