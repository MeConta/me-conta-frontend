import FrentesDropdown from 'components/molecules/FrentesDropdown'
import { authenticatedRoute } from 'pages/authenticationRoute'
import * as S from '../../../styles/pages/dashboards/styles'

function Agenda() {
  return (
    <>
      <S.WrapperDashboard>
        <FrentesDropdown onSelectItem={() => {}} />
      </S.WrapperDashboard>
    </>
  )
}

export default authenticatedRoute(Agenda)
