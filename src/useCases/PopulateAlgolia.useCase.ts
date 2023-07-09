import { AlgoliaService } from '../Infra/services/Algolia.service'
import { PrismicService } from '../Infra/services/Prismic.service'

export class PopulateAlgoliaUseCase {
  constructor(
    private readonly algoliaService: AlgoliaService,
    private readonly prismicService: PrismicService
  ) {}

  public async execute() {
    const documents = await this.prismicService.getPostDocuments()

    documents.forEach(async (document) => {
      await this.algoliaService.indexData(
        process.env.INDEX_NAME as string,
        document
      )
    })
  }
}
