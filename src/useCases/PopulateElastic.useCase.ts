import { ElasticService } from '../Infra/services/Elastic.service'
import { PrismicService } from '../Infra/services/Prismic.service'

export class PopulateElasticUseCase {
  constructor(
    private readonly elasticService: ElasticService,
    private readonly prismicService: PrismicService
  ) {}

  public async execute() {
    const documents = await this.prismicService.getPostDocuments()

    documents.forEach(async (document) => {
      await this.elasticService.indexData(
        process.env.Elastic_INDEX as string,
        document
      )
    })
  }
}
