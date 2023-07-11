import { Document } from '../../entities/Document'
import type { Query } from '../../valueObjects/Query'

export interface ISearchProvider {
  indexData: (indexName: string, document: Document) => Promise<void>
  search: (indexName: string, query: Query) => Promise<any>
  getObjectById: (indexName: string, id: string) => Promise<any>
  getObject: (indexName: string, lambdaQuery: Function) => Promise<any>
  updateData: (indexName: string, document: Document) => Promise<void>
}
