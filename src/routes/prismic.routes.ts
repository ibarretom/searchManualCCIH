import { Request, Response, Router } from 'express'

import { prismicWebhookController } from '../controllers/prismicWebhook'
import { PrismicSecretVerify } from './middlewares/PrismicSecretVerify'

const prismicRouter = Router()

prismicRouter.post(
  '/webhook/publish',
  PrismicSecretVerify,
  async (req: Request, res: Response) => {
    return await prismicWebhookController.handlePublish(req, res)
  }
)

export { prismicRouter }
