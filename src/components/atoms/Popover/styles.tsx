import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  width: 15rem;
  border-radius: 1rem;
  margin-left: 2rem;
  border: 1px solid ${(p) => p.theme.colors.silverChalice};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  z-index: 5;
  & > ::before {
    content: '';
    width: 16px;
    height: 16px;
    background-color: white;
    border-left: 1px solid ${(p) => p.theme.colors.silverChalice};
    border-bottom: 1px solid ${(p) => p.theme.colors.silverChalice};
    border-bottom-left-radius: 4px;
    transform: rotate(45deg);
    position: absolute;
    display: block;
    top: 28%;
    left: -19px;
    z-index: -1;
  }
  @media (max-width: 768px) {
    top: 100%;
    left: unset;
    right: -14px;
    margin-top: 2rem;
    margin-left: 0;
    & > ::before {
      border-left: 1px solid ${(p) => p.theme.colors.silverChalice};
      border-top: 1px solid ${(p) => p.theme.colors.silverChalice};
      border-bottom: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 0;
      top: -19px;
      left: 70%;
    }
  }
`

export const TextContainer = styled.div`
  position: relative;
  margin: 1rem;
  background-color: white;
  color: ${(p) => p.theme.colors.mineShaft};
  z-index: 5;
  & > ul {
    padding-top: 4px;
    list-style: inside;
  }
`

export const ListTitle = styled.p`
  font-size: ${(p) => p.theme.font.sizes['desk-medium']};
  font-weight: ${(p) => p.theme.font.semibold};
`
