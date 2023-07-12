import { ISearchProvider } from '../Infra/services/ISearch.provider'
import { PrismicService } from '../Infra/services/Prismic.service'
import { Document } from '../entities/Document'
import { PrismicResponse } from '../valueObjects/PrismicResponse'
import { AlgoliaMapper } from '../domain/services/Algolia.mapper'
import { PrismicPostContent } from '../valueObjects/PrismicPostContent'
import { IPrismicMapper } from '../domain/services/IPrismic.mapper'

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
            const document = await this.prismicService.getDocumentById(id)

            if (document.type != 'post') {
              resolve()
              return
            }

            const existent_document = await this.searchProvider.getObject(
              process.env.INDEX_NAME,
              (
                existent_document: Document & {
                  objectID: string
                }
              ) =>
                existent_document.titulo_post ===
                document.data.titulo_do_post[0].text
            )

            if (existent_document) {
              try {
                await this.deleteDocument(document)
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

  private async deleteDocument(document: PrismicResponse): Promise<void> {
    try {
      const promises = []

      if (document.data.intro_text.length > 0) {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.searchProvider.deleteObject(
                process.env.INDEX_NAME,
                this.prismicMapper.postToDocument(document, true)
              )
              resolve()
            } catch (err) {
              reject(err)
            }
          })
        )
      }

      document.data.conteudo.forEach((conteudo: PrismicPostContent) => {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.searchProvider.deleteObject(
                process.env.INDEX_NAME,
                this.prismicMapper.postToDocument(document, false, conteudo)
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
