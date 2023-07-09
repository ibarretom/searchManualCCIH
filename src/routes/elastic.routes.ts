import { Router } from 'express'
import { searchController } from '../controllers/search'
import { populateElasticController } from '../controllers/populateElastic'
import { AuthMiddleware } from './middlewares/Auth.middleware'

const elasticRouter = Router()

elasticRouter.get('/search', async (req, res) => {
  await searchController.handle(req, res)
})

elasticRouter.post('/populate', AuthMiddleware, async (req, res) => {
  await populateElasticController.handle(req, res)
})
export { elasticRouter }
