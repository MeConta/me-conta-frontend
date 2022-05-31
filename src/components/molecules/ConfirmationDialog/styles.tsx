import styled, { css, DefaultTheme } from 'styled-components'
import Animation from '../../../utils/animations/animation'

type ContainerProps = {
  isModal?: boolean
  isVisible: boolean
}

const modalStyles = (theme: DefaultTheme) => css`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  z-index: ${theme.layers.modal};
  height: 100%;
`

export const DivContainer = styled.div<ContainerProps>`
  ${({ isModal, theme, isVisible }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: ${isModal && 'blur(5px)'};

    ${isModal
      ? isVisible
        ? Animation.normal().setAnimation().fadeIn()
        : Animation.normal().setAnimation().fadeOut()
      : null}

    & > div {
      ${isModal && { opacity: 0 }}
      ${isModal &&
      Animation.absolute()
        .setProperties({
          top: { initialPosition: '-50px', finalPosition: '0' },
          animation: {
            delay: '0.35s',
            timingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
          },
          isRelative: true
        })
        .fadeIn()}
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

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    animation: zoomIn 0.3s forwards;

    @keyframes zoomIn {
      100% {
        transform: scale(1.2);
      }
    }
  }
`
