import { PrismicPostContent } from '../../valueObjects/PrismicPostContent'
import { PrismicResponse } from '../../valueObjects/PrismicResponse'

export interface IPrismicMapper {
  postToDocument: (
    document: PrismicResponse,
    intro_text: boolean,
    content?: PrismicPostContent
  ) => any
}
