import { Router } from 'express'
import { GetSearchController } from '../controllers/search'
import { populateElasticController } from '../controllers/populateElastic'
import { AuthMiddleware } from './middlewares/Auth.middleware'
import { ElasticService } from '../Infra/services/Elastic.service'
import { client } from '../Infra/clients/Elastic.client'

const elasticRouter = Router()

const elasticSearchProvider = new ElasticService(client)
const searchController = GetSearchController(elasticSearchProvider)

elasticRouter.get('/search', async (req, res) => {
  await searchController.handle(req, res)
})

elasticRouter.post('/populate', AuthMiddleware, async (req, res) => {
  await populateElasticController.handle(req, res)
})
export { elasticRouter }
