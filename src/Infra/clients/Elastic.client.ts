import { Client } from 'elasticsearch'
import 'dotenv/config'
export const client = new Client({ node: process.env.ELASTIC_SERVER })
