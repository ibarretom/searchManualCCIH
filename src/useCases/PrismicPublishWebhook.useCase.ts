import md5 from 'md5'
import { ISearchProvider } from '../Infra/services/ISearch.provider'
import { PrismicService } from '../Infra/services/Prismic.service'
import { Document } from '../entities/Document'
import { PrismicResponse } from '../valueObjects/PrismicResponse'
import { PrismicPostContent } from '../valueObjects/PrismicPostContent'
import { IPrismicMapper } from '../domain/services/IPrismic.mapper'

export class PrismicPublishWebhookUseCase {
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
              (existent_document: Document & { objectID: string }) =>
                existent_document.titulo_post ===
                document.data.titulo_do_post[0].text
            )

            if (!existent_document) {
              try {
                await this.createDocument(document)
                resolve()
                return
              } catch (err) {
                reject(err)
              }
            }

            try {
              await this.updateDocument(document)
              resolve()
            } catch (err) {}
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

  private async createDocument(document: PrismicResponse): Promise<void> {
    try {
      const promises = []

      if (document.data.intro_text.length > 0) {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.searchProvider.indexData(
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
              await this.searchProvider.indexData(
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

  private async updateDocument(document: PrismicResponse): Promise<void> {
    try {
      const promises = []

      if (document.data.intro_text.length > 0) {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.searchProvider.updateData(
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
              await this.searchProvider.updateData(
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
