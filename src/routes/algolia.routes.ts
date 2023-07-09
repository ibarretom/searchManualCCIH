import { Router } from 'express'

import { GetSearchController } from '../controllers/search'
import { AlgoliaClient } from '../Infra/clients/Algolia.client'
import { AlgoliaService } from '../Infra/services/Algolia.service'
import { AuthMiddleware } from './middlewares/Auth.middleware'
import { populateAlgoliaController } from '../controllers/populateAlgolia'

const algoliaRouter = Router()

const algoliaService = new AlgoliaService(AlgoliaClient)
const algoliaSearchProvider = GetSearchController(algoliaService)

algoliaRouter.get('/search', async (req, res) => {
  await algoliaSearchProvider.handle(req, res)
})

algoliaRouter.post('/populate', AuthMiddleware, async (req, res) => {
  await populateAlgoliaController.handle(req, res)
})
export { algoliaRouter }
