import { Client } from '@elastic/elasticsearch'
import { Document } from '../../entities/Document'

export class ElasticService {
  constructor(private readonly client: Client) {
    this.client = client
  }

  public async createIndex(indexName: string) {
    try {
      const indexExists = await this.client.indices.exists({ index: indexName })

      if (indexExists) {
        return
      }

      await this.client.indices.create({ index: indexName })
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao criar índice.')
    }
  }

  public async indexData(indexName: string, document: Document): Promise<void> {
    try {
      const documentExists = (await this.search(indexName, {
        match: {
          html_id: document.html_id,
        },
      })) as any

      if (documentExists.hits.hits.length > 0) {
        return
      }

      await this.client.index({
        index: indexName,
        body: document,
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async search(indexName: string, query: any): Promise<any> {
    try {
      const response = await this.client.search({
        index: indexName,
        body: { query },
      })

      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
