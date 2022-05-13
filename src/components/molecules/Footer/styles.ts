import styled from 'styled-components'

export const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(183.41deg, #67c3f3 -8.57%, #458ff6 82.96%);
`

export const FooterWrapper = styled.div`
  max-width: 1360px;
  margin: auto;
  align-self: start;
  padding: 25px 15px;
  color: white;

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 21px;
  }

  .description {
    font-size: 16px;
    margin-bottom: 22px;
  }

  .socials-group {
    display: flex;
    align-items: center;
  }

  .socials-group a {
    margin-right: 20px;
    cursor: pointer;
  }
`
