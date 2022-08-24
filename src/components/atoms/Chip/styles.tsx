import styled, { css } from 'styled-components'

type ChipProps = {
  backgroundColor: string
}

export const Chip = styled.span<ChipProps>`
  ${({ theme, backgroundColor }) => css`
    background-color: ${backgroundColor};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 ${theme.spacings.xxsmall} ${theme.spacings.xxsmall} 0;
    padding: 0 ${theme.spacings.xxsmall};
    border-radius: 8px;
    background: ${backgroundColor};
    color: black;
    height: 40px;
    font-size: ${theme.font.sizes['mob-large']};
    border: solid ${theme.colors.lightGray} 1px;
    position: relative;
    font-weight: bold;
  `}
`

export const CloseButton = styled.button`
  ${({ theme }) => css`
    display: inline-block;
    border-radius: 50%;
    border: none;
    width: 20px;
    height: 20px;
    padding: 2px;
    background: ${theme.colors.ceriseRed};
    color: ${theme.colors.white};
    text-align: center;
    position: absolute;
    top: -8px;
    right: -4px;
  `}
`
