import md5 from 'md5'
import { PrismicPostContent } from '../../valueObjects/PrismicPostContent'
import { PrismicResponse } from '../../valueObjects/PrismicResponse'
import { IPrismicMapper } from './IPrismic.mapper'

export class ElasticMapper implements IPrismicMapper {
  postToDocument(
    document: PrismicResponse,
    intro_text: boolean,
    content?: PrismicPostContent
  ): any {
    if (intro_text) {
      return {
        parent_id: document.id,
        url: `/post/document/${document.uid}`,
        titulo_post: document.data.titulo_do_post[0].text,
        html_id: md5(document.data.titulo_do_post[0].text),
        titulo_do_texto: '',
        content: document.data.intro_text[0].text,
        updated_at: document.last_publication_date,
      }
    }

    return {
      parent_id: document.id,
      url: `/post/document/${document.uid}`,
      titulo_post: document.data.titulo_do_post[0].text,
      html_id: md5(content.titulo_do_texto[0].text),
      titulo_do_texto: content.titulo_do_texto[0].text,
      content: content.conteudo_parte1[0].text,
      updated_at: document.last_publication_date,
    }
  }
}
