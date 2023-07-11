import { Request, Response } from 'express'
import { PrismicPublishWebhookUseCase } from '../../useCases/PrismicPublishWebhook.useCase'

export class PrismicWebhookController {
  constructor(
    private readonly prismicPublishWebHookService: PrismicPublishWebhookUseCase
  ) {}

  public async handlePublish(req: Request, res: Response) {
    const { type, documents } = req.body

    if (type === 'api-update') {
      await this.prismicPublishWebHookService.execute(documents)

      return res.status(200).json({ message: 'Webhook received' })
    }

    return res.status(200).json({ message: 'Webhook received' })
  }
}
