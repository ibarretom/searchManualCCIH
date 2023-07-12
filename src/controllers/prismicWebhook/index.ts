import { AlgoliaClient } from '../../Infra/clients/Algolia.client'
import { prismic_client } from '../../Infra/clients/Prismic.client'
import { AlgoliaService } from '../../Infra/services/Algolia.service'
import { PrismicService } from '../../Infra/services/Prismic.service'
import { AlgoliaMapper } from '../../domain/services/Algolia.mapper'
import { PrismicPublishWebhookUseCase } from '../../useCases/PrismicPublishWebhook.useCase'
import { PrismicWebhookController } from './PrismicWebhook.controller'

const prismicService = new PrismicService(prismic_client)
const searchProvider = new AlgoliaService(AlgoliaClient)
const algoliaMapper = new AlgoliaMapper()

const prismicUpdateWebhookUseCase = new PrismicPublishWebhookUseCase(
  prismicService,
  searchProvider,
  algoliaMapper
)

export const prismicWebhookController = new PrismicWebhookController(
  prismicUpdateWebhookUseCase
)
