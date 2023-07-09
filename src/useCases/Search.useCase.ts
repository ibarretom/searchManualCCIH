import { Document } from '../entities/Document'
import { SearchService } from '../services/Search.service'

export class SearchUseCase {
  constructor(private readonly searchService: SearchService) {
    this.searchService = searchService
  }

  public async execute(query: any): Promise<Document[]> {
    try {
      const matched_docs = await this.searchService.search(query)

      return matched_docs
    } catch (error) {
      throw new Error('Erro ao buscar pesquisa')
    }
  }
}
