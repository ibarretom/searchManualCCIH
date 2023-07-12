import md5 from 'md5'
import { Document } from '../../entities/Document'
import { PrismicResponse } from '../../valueObjects/PrismicResponse'
import { PrismicPostContent } from '../../valueObjects/PrismicPostContent'

export class PrismicService {
  constructor(private readonly client: any) {}

  public async getPostDocuments(): Promise<PrismicResponse[]> {
    const response = await this.client.getAllByType('post', {
      pageSize: 100,
    })

    return response
  }

  async getDocumentById(id: string): Promise<PrismicResponse> {
    try {
      const response = await this.client.getByID(id)
      return response
    } catch (err) {
      throw new Error(err)
    }
  }
}
