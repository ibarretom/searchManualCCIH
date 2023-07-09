export type Query = {
  match: {
    content: {
      query: string
      fuzziness: string
    }
  }
}
