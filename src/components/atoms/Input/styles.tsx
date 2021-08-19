import styled, { css, DefaultTheme } from 'styled-components'
// import { Props } from '.'

// type ButtonProps = Pick<Props, 'size' | 'color' | 'radius'>

const inputModifiers = {
  // medium: (theme: DefaultTheme) => css`
  //   height: 3rem;
  //   font-size: ${theme.font.sizes['desk-medium']};
  // `,
  // large: (theme: DefaultTheme) => css`
  //   height: 5rem;
  //   font-size: ${theme.font.sizes['desk-xlarge']};
  // `,
  // primary: (theme: DefaultTheme) => css`
  //   background: ${theme.colors.cornflowerBlue};

  //   &:hover {
  //     background-color: ${theme.colors.cobalt};
  //     transition: background-color 0.2s;
  //   }
  // `,
  // secondary: (theme: DefaultTheme) => css`
  //   background: ${theme.colors.ceriseRed};

  //   &:hover {
  //     background-color: ${theme.colors.maroonFlush};
  //     transition: background-color 0.2s;
  //   }
  // `,
  // negative: (theme: DefaultTheme) => css`
  //   background: ${theme.colors.white};
  //   color: ${theme.colors.ceriseRed};
  //   border: 1px solid ${theme.colors.ceriseRed};

  //   &:hover {
  //     color: ${theme.colors.maroonFlush};
  //     transition: color 0.2s;
  //   }
  // `,
  // round: (theme: DefaultTheme) => css`
  //   border-radius: ${theme.border['btn-round-radius']};
  // `,
  // square: (theme: DefaultTheme) => css`
  //   border-radius: ${theme.border['btn-square-radius']};
  // `
}

export const Input = styled.input`
  ${({ theme }) => css`
    color: ${theme.colors.lightGray};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxlarge};
    /* border: ;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxlarge};

    ${!!size && buttonModifiers[size](theme)};
    ${!!color && buttonModifiers[color](theme)};
    ${!!radius && buttonModifiers[radius](theme)}; */
  `}
`
