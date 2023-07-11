import { Router } from 'express'
import { elasticRouter } from './elastic.routes'
import { algoliaRouter } from './algolia.routes'
import { holterRoutes } from './holter.routes'
import { prismicRouter } from './prismic.routes'

const routes = Router()

routes.use('/elastic', elasticRouter)
routes.use('/algolia', algoliaRouter)
routes.use('/holter', holterRoutes)
routes.use('/prismic', prismicRouter)

export { routes }
