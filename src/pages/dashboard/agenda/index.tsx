import FrentesDropdown from 'components/molecules/FrentesDropdown'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../../styles/pages/dashboards/styles'

function Agenda() {
  return (
    <>
      <S.WrapperDashboard>
        <FrentesDropdown
          onSelectItem={() => {
            // empty for now
          }}
        />
      </S.WrapperDashboard>
    </>
  )
}

export default authenticatedRoute(Agenda)
