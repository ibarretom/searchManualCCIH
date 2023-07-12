import md5 from 'md5'
import { Document } from '../../entities/Document'
import { Query } from '../../valueObjects/Query'
import { ISearchProvider } from './ISearch.provider'
import { AlgoliaPostDocument } from '../../entities/AlgoliaPostDocument'

export class AlgoliaService implements ISearchProvider {
  constructor(private readonly client: any) {}

  public async indexData(
    indexName: string,
    document: AlgoliaPostDocument
  ): Promise<void> {
    try {
      const documentExists = await this.getObject(
        indexName,
        (hit: Document & { objectID: string }) =>
          hit.objectID === document.objectID
      )

      if (documentExists) {
        return
      }

      const index = this.client.initIndex(indexName)

      const response = await index.saveObject(document)
      console.log(response)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async updateData(
    indexName: string,
    document: AlgoliaPostDocument
  ): Promise<void> {
    try {
      const index = this.client.initIndex(indexName)

      const response = await index.saveObject(document)
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

  public async getObjectById(indexName: string, id: string): Promise<any> {
    try {
      const index = this.client.initIndex(indexName)

      const response = await index.getObject(id)

      return response
    } catch (error: any) {
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

  public async deleteObject(
    indexName: string,
    document: AlgoliaPostDocument
  ): Promise<void> {
    try {
      const index = this.client.initIndex(indexName)

      const response = await index.deleteObject(document.objectID)
      console.log(response)
    } catch (err) {
      throw new Error(err)
    }
  }
}
