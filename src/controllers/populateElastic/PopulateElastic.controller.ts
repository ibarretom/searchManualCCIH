import { Request, Response } from 'express'
import { PopulateElasticUseCase } from '../../useCases/PopulateElastic.useCase'

export class PopulateElasticController {
  constructor(
    private readonly populateElasticService: PopulateElasticUseCase
  ) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    await this.populateElasticService.execute()

    return response.status(204).json()
  }
}
