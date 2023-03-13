import { Axios } from '../../base/providers/Axios'
import { ParticipantList } from '../models/ParticipantList'
import { insertParticipantList } from '../services/insertParticipantList'

interface handleInsertParticipantListParams {
  item: ParticipantList
}

async function handleInsertParticipantList(params: handleInsertParticipantListParams): Promise<{error: string}> {
  const { item } = params;
  const insertParticipantListApi = new Axios({
    baseURL: process.env.INSERT_PARTICIPANT_LIST_URL || "",
  })
  try {
    await insertParticipantList({
      api: insertParticipantListApi,
      item,
    })
    return ({
      error: ""
    })
  } catch (insertParticipantListError: any) {
    console.log(insertParticipantListError)
    return ({
      error: "Erro ao inserir lista no banco"
    })
  }
}

export { handleInsertParticipantList }
