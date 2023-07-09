import { Document } from '../../entities/Document'
import { Query } from '../../valueObjects/Query'
import { ISearchProvider } from './ISearch.provider'

export class AlgoliaService implements ISearchProvider {
  constructor(private readonly client: any) {}

  public async indexData(indexName: string, document: Document): Promise<void> {
    try {
      const documentExists = await this.getObject(
        indexName,
        (hit: Document) => hit.html_id === document.html_id
      )

      if (documentExists) {
        return
      }

      const index = this.client.initIndex(indexName)

      const algoliaDocument = {
        objectID: document.html_id,
        ...document,
      }

      await index.saveObject(algoliaDocument)
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  public async getObject(indexName: string, lambdaQuery: Function) {
    try {
      const index = this.client.initIndex(indexName)

      const response = await index.findObject(lambdaQuery)

      return response
    } catch (error: any) {
      if (error.name == 'ObjectNotFoundError') {
        return null
      }

      throw new Error(error)
    }
  }

  public async search(indexName: string, query: Query): Promise<any> {
    try {
      const index = this.client.initIndex(indexName)

      const response = await index.search(query.match.content.query, {
        similarQuery: query.match.content.query,
        naturalLanguages: ['pt-br'],
        typoTolerance: true,
      })

      return response
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }
}
