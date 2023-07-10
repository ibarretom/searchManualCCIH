import { Request, Response, Router } from 'express'

import { Holter } from '../controllers/holter/Holter.controller'

const holterRoutes = Router()

const holter = new Holter()

holterRoutes.get('/status', async (req: Request, res: Response) => {
  return holter.handle(req, res)
})

export { holterRoutes }
