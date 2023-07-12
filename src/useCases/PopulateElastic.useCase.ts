import { ElasticService } from '../Infra/services/Elastic.service'
import { PrismicService } from '../Infra/services/Prismic.service'
import { ElasticMapper } from '../domain/services/Elastic.mapper'
import { PrismicPostContent } from '../valueObjects/PrismicPostContent'
import { PrismicResponse } from '../valueObjects/PrismicResponse'

export class PopulateElasticUseCase {
  constructor(
    private readonly elasticService: ElasticService,
    private readonly prismicService: PrismicService
  ) {}

  public async execute() {
    const documents = await this.prismicService.getPostDocuments()
    const elasticMapper = new ElasticMapper()

    const promises = []
    documents.forEach((document: PrismicResponse) => {
      if (document.data.intro_text.length > 0) {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              await this.elasticService.indexData(
                process.env.INDEX_NAME,
                elasticMapper.postToDocument(document, true)
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
              await this.elasticService.indexData(
                process.env.INDEX_NAME,
                elasticMapper.postToDocument(document, false, conteudo)
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
