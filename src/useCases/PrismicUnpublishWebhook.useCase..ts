import { ISearchProvider } from '../Infra/services/ISearch.provider'
import { PrismicService } from '../Infra/services/Prismic.service'
import { Document } from '../entities/Document'
import { PrismicResponse } from '../valueObjects/PrismicResponse'
import { AlgoliaMapper } from '../domain/services/Algolia.mapper'
import { PrismicPostContent } from '../valueObjects/PrismicPostContent'
import { IPrismicMapper } from '../domain/services/IPrismic.mapper'
import { AlgoliaPostDocument } from '../entities/AlgoliaPostDocument'

export class PrismicUnpublishWebhookUseCase {
  constructor(
    private readonly prismicService: PrismicService,
    private readonly searchProvider: ISearchProvider,
    private readonly prismicMapper: IPrismicMapper
  ) {}

  async execute(documents: string[]): Promise<void> {
    const promises = []
    documents.forEach((id) => {
      promises.push(
        new Promise<void>(async (resolve, reject) => {
          try {
            const existent_document =
              (await this.searchProvider.getGroupedObjects(
                process.env.INDEX_NAME,
                id
              )) as AlgoliaPostDocument[]

            if (existent_document.length > 0) {
              try {
                await this.deleteDocument(existent_document)
                resolve()
                return
              } catch (err) {
                reject(err)
              }
            }

            resolve()
          } catch (err) {
            reject(err)
          }
        })
      )
    })

    try {
      await Promise.all(promises)
    } catch (err) {
      throw new Error(err)
    }
  }

  private async deleteDocument(
    documents: AlgoliaPostDocument[]
  ): Promise<void> {
    try {
      const promises = []

      documents.forEach((document: AlgoliaPostDocument) => {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.searchProvider.deleteObject(
                process.env.INDEX_NAME,
                document
              )
              resolve()
            } catch (err) {
              reject(err)
            }
          })
        )
      })

      await Promise.all(promises)
    } catch (err) {
      throw new Error(err)
    }
  }
}
