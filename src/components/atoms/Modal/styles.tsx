import styled, { css, DefaultTheme } from 'styled-components'
import Animation from '../../../utils/animations/animation'

type ContainerProps = {
  isEnabled?: boolean
}

export const DivContainer = styled.div<ContainerProps>`
  ${({ theme, isEnabled }) => css`
    background-color: rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    z-index: 1;
    height: 100%;
    backdrop-filter: blur(5px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    ${isEnabled
      ? Animation.normal().setAnimation().fadeIn()
      : Animation.normal().setAnimation().fadeOut()}
  `}
`

export const ModalContent = styled.div`
  width: 421px;
  height: 328px;
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
