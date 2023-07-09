import { AlgoliaClient } from '../../Infra/clients/Algolia.client'
import { AlgoliaService } from '../../Infra/services/Algolia.service'
import { ISearchProvider } from '../../Infra/services/ISearch.provider'
import { SearchService } from '../../services/Search.service'
import { SearchUseCase } from '../../useCases/Search.useCase'
import { SearchController } from './Search.controller'

export function GetSearchController(
  searchProvider: ISearchProvider
): SearchController {
  const searchService = new SearchService(searchProvider)
  const searchUseCase = new SearchUseCase(searchService)

  return new SearchController(searchUseCase)
}
