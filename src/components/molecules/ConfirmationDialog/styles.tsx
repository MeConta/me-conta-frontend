import styled, { css, DefaultTheme, keyframes } from 'styled-components'

type ContainerProps = {
  isModal?: boolean
}

const fadeIn = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`

const fadeInFromTop = keyframes`
  0% {opacity: 0; top: -50px}
  100% {opacity: 1; top: 0}
`

const modalStyles = (theme: DefaultTheme) => css`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  z-index: ${theme.layers.modal};
  height: 100%;
`

const modalAnimation = () => css`
  position: relative;
  opacity: 0;
  animation: ${fadeInFromTop} 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
  animation-delay: 0.35s;
`

export const DivContainer = styled.div<ContainerProps>`
  ${({ isModal, theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: ${isModal && 'blur(5px)'};
    animation: ${isModal && fadeIn} 0.5s;

    & > div {
      ${isModal && modalAnimation()}
    }

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
