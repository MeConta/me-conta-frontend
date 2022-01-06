import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .avatarAndInfoContainer {
    display: flex;
    margin-left: 22px;
  }

  .info {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }

  .name {
    font-size: 18px;
    color: #009ef7;
    line-height: 27px;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  .profileLink {
    font-size: 14px;
    color: #a1a5b7;
    text-decoration: none;
    line-height: 21px;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  .profileLink:hover {
    color: #f1416c;
  }
`
