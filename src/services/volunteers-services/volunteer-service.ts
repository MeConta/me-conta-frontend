import { AxiosInstance } from 'axios'
import { UserType } from 'enums/user-type.enum'
import { SessionType } from 'utils/enums/session-type.enum'

interface FindVolunteersInput {
  type: UserType.ATENDENTE | UserType.SUPERVISOR
  sessionType: SessionType
}

interface IVolunteerService {
  findVolunteers({ type, sessionType }: FindVolunteersInput): Promise<any>
}

export class VolunteerService implements IVolunteerService {
  constructor(private readonly service: AxiosInstance) {}

  async findVolunteers({
    type,
    sessionType
  }: FindVolunteersInput): Promise<any> {
    const response = await this.service.get(
      `/voluntarios/listar/${type}?frente=${sessionType}`
    )
    return response.data
  }
}
