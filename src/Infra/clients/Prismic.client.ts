import prismic from '@prismicio/client'
import nodefetch from 'node-fetch'
import 'dotenv/config'

const routes = [
  { type: 'post', path: '/' },
  { type: 'post', path: '/post/:uid' },
]

export const prismic_client = prismic.createClient(
  process.env.PRISMIC_ENDPOINT,
  {
    nodefetch,
    routes,
  }
)
