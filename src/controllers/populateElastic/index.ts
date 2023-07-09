import { prismic_client } from '../../Infra/clients/Prismic.client'
import { client as elastic_client } from '../../Infra/clients/Elastic.client'
import { PrismicService } from '../../Infra/services/Prismic.service'
import { ElasticService } from '../../Infra/services/Elastic.service'
import { PopulateElasticUseCase } from '../../useCases/PopulateElastic.useCase'
import { PopulateElasticController } from './PopulateElastic.controller'

const prismicService = new PrismicService(prismic_client)
const elasticService = new ElasticService(elastic_client)
const populateElasticUseCase = new PopulateElasticUseCase(
  elasticService,
  prismicService
)
const populateElasticController = new PopulateElasticController(
  populateElasticUseCase
)

export { populateElasticController }
