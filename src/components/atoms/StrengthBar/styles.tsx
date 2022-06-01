import styled, { css } from 'styled-components'

type BarProps = {
  active: boolean
}

export const StrengthBarWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`
export const Bar = styled.div<BarProps>`
  ${({ theme, active, color }) => css`
    height: 4px;
    min-width: 50px;
    background: ${active ? color : theme.colors.xlightGray};
  `}
`
export const StrengthText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-medium']};
  `}
`

export const TextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    margin-top: ${theme.spacings.xxxsmall};
  `}
`
