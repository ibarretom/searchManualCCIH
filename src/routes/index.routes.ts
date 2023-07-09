import { Router } from 'express'
import { elasticRouter } from './elastic.routes'

const routes = Router()

routes.use('/elastic', elasticRouter)

export { routes }
