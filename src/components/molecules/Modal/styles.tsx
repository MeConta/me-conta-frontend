import styled, { css } from 'styled-components'
import Animation from '../../../utils/animations/animation'

type ContainerProps = {
  isVisible?: boolean
}

type ModalContentProps = {
  width: string
  height: string
}

export const DivContainer = styled.div<ContainerProps>`
  ${({ isVisible }) => css`
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
    ${isVisible
      ? Animation.normal().setAnimation().fadeIn()
      : Animation.normal().setAnimation().fadeOut()}
  `}
`

export const ModalContent = styled.div<ModalContentProps>`
  ${({ width, height }) => css`
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: ${width};
    height: ${height};
  `}
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 24px 24px 8px;
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
