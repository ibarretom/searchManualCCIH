import { ElasticService } from '../Infra/services/Elastic.service'
import type { Query } from '../valueObjects/Query.d.ts'

export class SearchService {
  constructor(private readonly client: any) {
    this.client = client
  }

  public async search(query: Query): Promise<Document[]> {
    const elastic = new ElasticService(this.client)

    const matched_docs = (await elastic.search(
      process.env.ELASTIC_INDEX as string,
      query
    )) as Document[]

    return matched_docs
  }
}
