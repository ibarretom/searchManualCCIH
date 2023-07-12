import md5 from 'md5'
import { Document } from '../../entities/Document'
import { PrismicResponse } from '../../valueObjects/PrismicResponse'
import { PrismicPostContent } from '../../valueObjects/PrismicPostContent'

export class PrismicService {
  constructor(private readonly client: any) {}

  public async getPostDocuments(): Promise<Document[]> {
    const response = await this.client.getAllByType('post', {
      pageSize: 100,
    })

    const objs: Document[] = []

    response.forEach((doc: PrismicResponse) => {
      if (doc.data.intro_text.length > 0) {
        objs.push({
          parent_id: doc.id,
          url: `/post/document/${doc.uid}`,
          titulo_post: doc.data.titulo_do_post[0].text,
          html_id: md5(doc.data.titulo_do_post[0].text),
          titulo_do_texto: '',
          content: doc.data.intro_text[0].text,
          updated_at: doc.last_publication_date,
        })
      }

      doc.data.conteudo.forEach((conteudo: PrismicPostContent) => {
        objs.push({
          parent_id: doc.id,
          url: `/post/document/${doc.uid}`,
          titulo_post: doc.data.titulo_do_post[0].text,
          html_id: md5(conteudo.titulo_do_texto[0].text),
          titulo_do_texto: conteudo.titulo_do_texto[0].text,
          content: conteudo.conteudo_parte1[0].text,
          updated_at: doc.last_publication_date,
        })
      })
    })

    return objs
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
