import { Request, Response } from 'express'
import { PopulateAlgoliaUseCase } from '../../useCases/PopulateAlgolia.useCase'

export class PopulateAlgoliaController {
  constructor(
    private readonly populateAlgoliaUseCase: PopulateAlgoliaUseCase
  ) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    await this.populateAlgoliaUseCase.execute()

    return response.status(200).json()
  }
}
