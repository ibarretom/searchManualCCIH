import { Router } from 'express'
import { elasticRouter } from './elastic.routes'
import { algoliaRouter } from './algolia.routes'
import { holterRoutes } from './holter.routes'

const routes = Router()

routes.use('/elastic', elasticRouter)
routes.use('/algolia', algoliaRouter)
routes.use('/holter', holterRoutes)

export { routes }
