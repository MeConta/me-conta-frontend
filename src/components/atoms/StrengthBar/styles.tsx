import styled, { css } from 'styled-components'

type BarProps = {
  active: boolean
}

export const StrengthBarWrapper = styled.div`
  padding: 0 2px;
`

export const BarsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`

export const Bar = styled.div<BarProps>`
  ${({ theme, active, color }) => css`
    height: 4px;
    width: 100%;
    background-color: ${active ? color : theme.colors.xlightGray};
    border-radius: 5px;

    transition: background-color 0.3s ease-in;
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
