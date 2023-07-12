import md5 from 'md5'
import { Document } from './Document'

export class AlgoliaPostDocument extends Document {
  objectID: string

  constructor(document: Document) {
    super(document)
    this.objectID = md5(
      document.html_id + document.titulo_post + document.titulo_do_texto
    )
  }
}
