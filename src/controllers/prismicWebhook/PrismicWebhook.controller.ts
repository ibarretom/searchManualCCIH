import { Request, Response } from 'express'
import { PrismicPublishWebhookUseCase } from '../../useCases/PrismicPublishWebhook.useCase'
import { PrismicUnpublishWebhookUseCase } from '../../useCases/PrismicUnpublishWebhook.useCase.'

export class PrismicWebhookController {
  constructor(
    private readonly prismicPublishWebHookService: PrismicPublishWebhookUseCase,
    private readonly prismicUnpublishWebHookService: PrismicUnpublishWebhookUseCase
  ) {}

  public async handlePublish(req: Request, res: Response) {
    const { type, documents } = req.body

    if (type === 'api-update') {
      await this.prismicPublishWebHookService.execute(documents)

      return res.status(200).json({ message: 'Webhook received' })
    }

    return res.status(200).json({ message: 'Webhook received' })
  }

  public async handleUnpublish(req: Request, res: Response) {
    const { type, documents } = req.body

    if (type === 'api-update') {
      await this.prismicUnpublishWebHookService.execute(documents)
    }

    return res.status(200).json({ message: 'Webhook received' })
  }
}
