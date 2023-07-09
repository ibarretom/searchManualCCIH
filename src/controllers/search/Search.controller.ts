import { Request, Response } from 'express'
import { SearchUseCase } from '../../useCases/Search.useCase'

export class SearchController {
  constructor(private readonly searchUseCase: SearchUseCase) {}

  public async handle(req: Request, res: Response) {
    const { q } = req.query

    const response = await this.searchUseCase.execute({
      match: {
        content: {
          query: q,
          fuzziness: 'auto',
        },
      },
    })

    return res.status(200).json(response)
  }
}
