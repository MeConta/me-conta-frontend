import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Mulish', sans-serif;

  img {
    border-radius: 50%;
  }

  h3 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 3rem;
  }

  p {
    color: white;
    font-size: 1.2rem;
    line-height: 3rem;
  }

  @media only screen and (min-width: 600px) {
    img {
      width: 70px;
      height: 90px;
    }
  }
`
