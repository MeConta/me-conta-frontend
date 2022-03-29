import FrentesDropdown from 'components/molecules/FrentesDropdown'
import * as S from '../../styles/pages/dashboards/styles'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import { UserType } from 'enums/user-type.enum'
import { useEffect } from 'react'
import { useIdleTimerContext } from 'react-idle-timer'

type SelectedFrente = {
  id: number
  text: string
  value: string
}

function DashboardAluno() {
  const onSelectItemHandler = (item: SelectedFrente) => {
    console.log(item)
  }

  const activityCtx = useIdleTimerContext()
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('*** Dashboard Aluno ***')
      console.log('Current Time:', new Date().toISOString())
      console.log('User is Idle: ', activityCtx.isIdle())
      console.log('Remaining Time: ', activityCtx.getRemainingTime())
      console.log('Last Active Time: ', activityCtx.getLastActiveTime())
      console.log('Last Idle Time', activityCtx.getLastIdleTime())
    }, 2000)

    return () => {
      clearTimeout(interval)
    }
  }, [])

  return (
    <S.WrapperDashboard>
      <Styled.Title>
        Escolha uma especialidade e um especialista para sua sessão:
      </Styled.Title>
      <FrentesDropdown onSelectItem={onSelectItemHandler} />
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAluno, {
  allowedRoles: [UserType.ALUNO]
})
