import { Document } from '../entities/Document'
import type { Query } from '../valueObjects/Query.d.ts'
import { ISearchProvider } from '../Infra/services/ISearch.provider'

export class SearchService {
  constructor(private readonly searchProvider: ISearchProvider) {}

  public async search(query: Query): Promise<Document[]> {
    const matched_docs = (await this.searchProvider.search(
      process.env.INDEX_NAME as string,
      query
    )) as Document[]

    return matched_docs
  }
}
