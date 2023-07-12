export class Document {
  parent_id: string
  url: string
  titulo_post: string
  html_id: string
  titulo_do_texto: string
  content: string
  updated_at: string

  constructor(document: Document) {
    this.parent_id = document.parent_id
    this.url = document.url
    this.titulo_post = document.titulo_post
    this.html_id = document.html_id
    this.titulo_do_texto = document.titulo_do_texto
    this.content = document.content
    this.updated_at = document.updated_at
  }
}
