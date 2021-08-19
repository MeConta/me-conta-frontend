import styled, { css, DefaultTheme } from 'styled-components'
// import { Props } from '.'

// type ButtonProps = Pick<Props, 'size' | 'color' | 'radius'>

const inputModifiers = {}

export const Input = styled.input`
  ${({ theme }) => css`
    color: ${theme.colors.lightGray};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxlarge};
  `}
`
