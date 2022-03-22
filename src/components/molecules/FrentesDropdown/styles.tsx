import styled from 'styled-components'
import { School, AutoStories, VolunteerActivism } from '@styled-icons/material'
import {
  ArrowIosDownwardOutline,
  ArrowIosUpwardOutline
} from '@styled-icons/evaicons-outline'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 0.7rem;
  height: 12rem;
  width: 30rem;

  .frente {
    border-radius: 50%;
    width: 42px;
    margin: 0 10px;
    padding: 10px;

    @media (max-width: 768px) {
      width: 34px;
    }
  }
`

export const OptionListContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.7rem;
  padding-left: 0.5rem;

  & li {
    list-style-type: none;
    padding: 0.3rem;
    cursor: pointer;
  }
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  border: none;
  background-color: transparent;
  width: 100%;
  cursor: pointer;

  & span {
    cursor: pointer;
  }
`

export const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: start;
  align-items: center;
  width: 100%;
`

export const LabelContainer = styled.div`
  & p {
    color: #848A8C;
    font-size: 1.5rem;
    font-weight: 300;
  }
}
`

export const StyledDropdown = styled.div`
  padding: 0.2rem 0.6rem;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 0.8rem;
  cursor: pointer;
  min-height: 50px;
  min-width: 250px;
  border: 0.1rem solid;
  border-color: #848a8c;
  border-radius: 0.7rem;
`

export const StyledArrowIosDownwardOutline = styled(ArrowIosDownwardOutline)`
  margin-left: 0.6rem;
  color: #848a8c;
  width: 18px;
  justify-self: end;
  @media (max-width: 768px) {
    width: 12px;
  }
`

export const StyledArrowIosUpwardOutline = styled(ArrowIosUpwardOutline)`
  margin-left: 0.6rem;
  color: #848a8c;
  width: 18px;
  @media (max-width: 768px) {
    width: 12px;
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
