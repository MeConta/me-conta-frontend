import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import {
  AvailableDates,
  DateType
} from '../../components/molecules/AvaliableDates'
import { AddDates } from '../../components/molecules/AddDates'

const dates: DateType[] = [
  {
    date: new Date(2021, 11, 17, 13),
    deletable: true
  },
  {
    date: new Date(2021, 11, 18, 14),
    deletable: true
  },
  {
    date: new Date(2021, 11, 19, 9),
    deletable: true
  },
  {
    date: new Date(2021, 11, 20, 13),
    deletable: true
  },
  {
    date: new Date(2021, 11, 21, 14),
    deletable: false
  },
  {
    date: new Date(2021, 11, 22, 8),
    deletable: true
  },
  {
    date: new Date(2021, 11, 23, 13),
    deletable: true
  },
  {
    date: new Date(2021, 11, 24, 14),
    deletable: false
  },
  {
    date: new Date(2021, 11, 25, 8),
    deletable: true
  },
  {
    date: new Date(2021, 11, 26, 13),
    deletable: true
  },
  {
    date: new Date(2021, 11, 27, 17),
    deletable: true
  },
  {
    date: new Date(2021, 11, 28, 14),
    deletable: true
  },
  {
    date: new Date(2021, 11, 29, 13),
    deletable: true
  },
  {
    date: new Date(2021, 11, 30, 14),
    deletable: true
  }
]

function DashboardAtendente() {
  return (
    <S.WrapperDashboard>
      <S.SectionTitle>Meus horários cadastrados:</S.SectionTitle>
      <AvailableDates dates={dates} onDelete={() => {}} />
      <S.SectionTitle>Agendamentos futuros</S.SectionTitle>
      <AddDates alreadySelected={[]} handleSave={() => {}} />
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAtendente, {
  allowedRoles: [UserType.ATENDENTE]
})
