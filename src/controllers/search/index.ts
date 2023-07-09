import { SearchService } from '../../services/Search.service'
import { SearchUseCase } from '../../useCases/Search.useCase'
import { SearchController } from './Search.controller'
import { client } from '../../Infra/clients/Elastic.client'

const searchService = new SearchService(client)
const searchUseCase = new SearchUseCase(searchService)
const searchController = new SearchController(searchUseCase)

export { searchController }
