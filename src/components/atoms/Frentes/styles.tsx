import styled from 'styled-components'
import { School, AutoStories, VolunteerActivism } from '@styled-icons/material'

export const Wrapper = styled.div`
  display: flex;
  margin-right: 19px;
  gap: 8px;

  .frente {
    border-radius: 50%;
    width: 42px;
    margin-left: 10px;
    padding: 10px;

    @media (max-width: 768px) {
      width: 28px;
    }
  }
`

export const StyledSchool = styled(School)`
  color: #049ef7;
  background-color: #f1faff;
`

export const StyledAutoStories = styled(AutoStories)`
  color: #50cd89;
  background-color: #e8fff3;
`

export const StyledVolunteerActivism = styled(VolunteerActivism)`
  color: #7239ea;
  background-color: #f8f5ff;
`
