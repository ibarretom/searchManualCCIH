import { randomUUID } from 'crypto'
import md5 from 'md5'
import { Document } from '../../entities/Document'

export class PrismicService {
  constructor(private readonly client: any) {}

  public async getPostDocuments() {
    const response = await this.client.getAllByType('post', {
      pageSize: 100,
    })

    const objs: Document[] = []

    response.forEach((doc: any) => {
      if (doc.data.intro_text.length > 0) {
        objs.push({
          url: `/post/document/${doc.uid}`,
          titulo_post: doc.data.titulo_do_post[0].text,
          html_id: randomUUID(),
          titulo_do_texto: '',
          content: doc.data.intro_text[0].text,
          updated_at: doc.last_publication_date,
        })
      }

      doc.data.conteudo.forEach((conteudo: any) => {
        objs.push({
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
}
