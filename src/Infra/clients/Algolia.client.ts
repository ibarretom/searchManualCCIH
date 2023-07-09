import algoliasearch from 'algoliasearch'
import 'dotenv/config'

export const AlgoliaClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)
