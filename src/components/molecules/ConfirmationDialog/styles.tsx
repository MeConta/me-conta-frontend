import styled, { css, DefaultTheme } from 'styled-components'

type ContainerProps = {
  isModal?: boolean
}

const modalStyles = (theme: DefaultTheme) => css`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  z-index: ${theme.layers.modal};
  height: 100%;
`

export const DivContainer = styled.div<ContainerProps>`
  ${({ isModal, theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: ${isModal && 'blur(5px)'};

    ${!!isModal && modalStyles(theme)}

    @media screen and (max-width: 425px) {
      padding: 0;
      & > div {
        margin: 0;
      }
    }

    @media screen and (max-width: 280px) {
      > div {
        padding: ${theme.spacings.gsmall};
      }
    }
  `}
`
