import { ApiInsertAble } from '../../base/Api'
import { ParticipantList } from '../models/ParticipantList'

interface insertParticipantListParams {
  api: ApiInsertAble,
  item: ParticipantList
}

async function insertParticipantList(params: insertParticipantListParams): Promise<void> {
  const { api, item } = params;
  const { error } = await api.post<void>({
    endpoint: '/',
    data: item,
  })
  if (error) throw error
}

export { insertParticipantList }
