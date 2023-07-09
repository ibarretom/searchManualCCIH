import { AlgoliaClient } from '../../Infra/clients/Algolia.client'
import { prismic_client } from '../../Infra/clients/Prismic.client'
import { AlgoliaService } from '../../Infra/services/Algolia.service'
import { PrismicService } from '../../Infra/services/Prismic.service'
import { PopulateAlgoliaUseCase } from '../../useCases/PopulateAlgolia.useCase'
import { PopulateAlgoliaController } from './PopulateAlgolia.controller'

const prismicService = new PrismicService(prismic_client)
const algoliaService = new AlgoliaService(AlgoliaClient)
const populateAlgoliaUseCase = new PopulateAlgoliaUseCase(
  algoliaService,
  prismicService
)
const populateAlgoliaController = new PopulateAlgoliaController(
  populateAlgoliaUseCase
)

export { populateAlgoliaController }
