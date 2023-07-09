import { Document } from '../../entities/Document'
import type { Query } from '../../valueObjects/Query'

export interface ISearchProvider {
  indexData: (indexName: string, document: Document) => Promise<void>
  search: (indexName: string, query: Query) => Promise<any>
}
