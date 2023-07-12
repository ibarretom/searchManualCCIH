import md5 from 'md5'
import { ISearchProvider } from '../Infra/services/ISearch.provider'
import { PrismicService } from '../Infra/services/Prismic.service'
import { Document } from '../entities/Document'
import { PrismicResponse } from '../valueObjects/PrismicResponse'
import { PrismicPostContent } from '../valueObjects/PrismicPostContent'
import { IPrismicMapper } from '../domain/services/IPrismic.mapper'
import { AlgoliaPostDocument } from '../entities/AlgoliaPostDocument'

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
                existent_document.parent_id == document.id
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
      const documents_saved = (await this.searchProvider.getGroupedObjects(
        process.env.INDEX_NAME,
        `${document.id};parent_id`
      )) as AlgoliaPostDocument[]

      const published_docs: AlgoliaPostDocument[] = []

      if (document.data.intro_text.length > 0) {
        const doc = this.prismicMapper.postToDocument(document, true)

        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.searchProvider.updateData(process.env.INDEX_NAME, doc)
              resolve()
            } catch (err) {
              reject(err)
            }
          })
        )

        published_docs.push(doc)
      }

      document.data.conteudo.forEach((conteudo: PrismicPostContent) => {
        const doc = this.prismicMapper.postToDocument(document, false, conteudo)

        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.searchProvider.updateData(process.env.INDEX_NAME, doc)
              resolve()
            } catch (err) {
              reject(err)
            }
          })
        )

        published_docs.push(doc)
      })

      const documents_to_delete = documents_saved.filter(
        (saved_doc: AlgoliaPostDocument) =>
          published_docs.findIndex(
            (published_doc: AlgoliaPostDocument) =>
              published_doc.objectID == saved_doc.objectID
          ) == -1
      )

      documents_to_delete.forEach((document: AlgoliaPostDocument) => {
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
