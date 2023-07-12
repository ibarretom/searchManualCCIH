import { AlgoliaService } from '../Infra/services/Algolia.service'
import { PrismicService } from '../Infra/services/Prismic.service'
import { AlgoliaMapper } from '../domain/services/Algolia.mapper'
import { PrismicPostContent } from '../valueObjects/PrismicPostContent'
import { PrismicResponse } from '../valueObjects/PrismicResponse'

export class PopulateAlgoliaUseCase {
  constructor(
    private readonly algoliaService: AlgoliaService,
    private readonly prismicService: PrismicService
  ) {}

  public async execute(): Promise<void> {
    const documents = await this.prismicService.getPostDocuments()
    const promises = []
    const algoliaMapper = new AlgoliaMapper()

    documents.forEach((document: PrismicResponse) => {
      if (document.data.intro_text.length > 0) {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.algoliaService.indexData(
                process.env.INDEX_NAME,
                algoliaMapper.postToDocument(document, true)
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
              await this.algoliaService.indexData(
                process.env.INDEX_NAME,
                algoliaMapper.postToDocument(document, false, conteudo)
              )
              resolve()
            } catch (err) {
              reject(err)
            }
          })
        )
      })
    })

    await Promise.all(promises)
  }
}
