import md5 from 'md5'
import { PrismicResponse } from '../../valueObjects/PrismicResponse'
import { AlgoliaPostDocument } from '../../entities/AlgoliaPostDocument'
import { PrismicPostContent } from '../../valueObjects/PrismicPostContent'
import { IPrismicMapper } from './IPrimsmic.mapper'

export class AlgoliaMapper implements IPrismicMapper {
  public postToDocument(
    document: PrismicResponse,
    intro_text: boolean,
    content = {} as PrismicPostContent
  ): AlgoliaPostDocument {
    const html_id = md5(document.data.titulo_do_post[0].text)

    if (intro_text) {
      return new AlgoliaPostDocument({
        parent_id: document.id,
        url: `/post/document/${document.uid}`,
        titulo_post: document.data.titulo_do_post[0].text,
        html_id,
        titulo_do_texto: '',
        content: document.data.intro_text[0].text,
        updated_at: document.last_publication_date,
      })
    }

    return new AlgoliaPostDocument({
      parent_id: document.id,
      url: `/post/document/${document.uid}`,
      titulo_post: document.data.titulo_do_post[0].text,
      html_id: md5(content.titulo_do_texto[0].text),
      titulo_do_texto: content.titulo_do_texto[0].text,
      content: content.conteudo_parte1[0].text,
      updated_at: document.last_publication_date,
    })
  }
}
