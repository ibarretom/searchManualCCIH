import md5 from 'md5'
import { Document } from '../../entities/Document'
import { Query } from '../../valueObjects/Query'
import { ISearchProvider } from './ISearch.provider'

export class AlgoliaService implements ISearchProvider {
  constructor(private readonly client: any) {}

  public async indexData(indexName: string, document: Document): Promise<void> {
    try {
      const objectID = md5(
        document.html_id + document.titulo_post + document.titulo_do_texto
      )

      const documentExists = await this.getObject(
        indexName,
        (hit: Document & { objectID: string }) => hit.objectID === objectID
      )

      if (documentExists) {
        return
      }

      const index = this.client.initIndex(indexName)

      const algoliaDocument = {
        objectID: objectID,
        ...document,
      }

      const response = await index.saveObject(algoliaDocument)
      console.log(response)
    } catch (error: any) {
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
      throw new Error(error)
    }
  }
}
