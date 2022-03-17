import FrentesDropdown from 'components/molecules/FrentesDropdown'
import * as S from '../../../styles/pages/dashboard-aluno/styles'

export default function Agenda() {
  return (
    <>
      <S.WrapperDashboard>
        <FrentesDropdown onSelectItem={() => {}} />
      </S.WrapperDashboard>
    </>
  )
}
