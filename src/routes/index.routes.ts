import { Router } from 'express'
import { elasticRouter } from './elastic.routes'
import { algoliaRouter } from './algolia.routes'

const routes = Router()

routes.use('/elastic', elasticRouter)
routes.use('/algolia', algoliaRouter)

export { routes }
