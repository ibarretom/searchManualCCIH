import { AlgoliaClient } from '../clients/Algolia.client'
import 'dotenv/config'

export async function InitializeAlgolia() {
  const index = AlgoliaClient.initIndex(process.env.INDEX_NAME as string)

  await index.setSettings({
    searchableAttributes: ['titulo_post', 'titulo_do_texto', 'content'],
    highlightPreTag: '**',
    highlightPostTag: '**',
  })
}
