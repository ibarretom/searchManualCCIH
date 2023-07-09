import { client } from '../clients/Elastic.client'
import { ElasticService } from '../services/Elastic.service'
import 'dotenv/config'

export async function InitializeElastic() {
  await new ElasticService(client).createIndex(process.env.INDEX_NAME as string)
}
