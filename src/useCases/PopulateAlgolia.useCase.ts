import { AlgoliaService } from '../Infra/services/Algolia.service'
import { PrismicService } from '../Infra/services/Prismic.service'

export class PopulateAlgoliaUseCase {
  constructor(
    private readonly algoliaService: AlgoliaService,
    private readonly prismicService: PrismicService
  ) {}

  public async execute(): Promise<void> {
    const documents = await this.prismicService.getPostDocuments()
    const promises = []

    documents.forEach((doc) =>
      promises.push(
        new Promise<void>((resolve, reject) => {
          this.algoliaService
            .indexData(process.env.INDEX_NAME as string, doc)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        })
      )
    )

    await Promise.all(promises)
  }
}
