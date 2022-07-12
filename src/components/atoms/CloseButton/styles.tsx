import styled from 'styled-components'

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
