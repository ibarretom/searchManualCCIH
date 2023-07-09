import cors from 'cors'
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import 'express-async-errors'
import { routes } from './routes/index.routes'
import 'dotenv/config'
import { ElasticService } from './Infra/services/Elastic.service'
import { client } from './Infra/clients/Elastic.client'

const app = express()

app.use(cors())
app.use(express.json())

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status(500).json({ message: 'Internal server error' })
  }
)

new ElasticService(client).createIndex(process.env.ELASTIC_INDEX as string)

app.use(routes)

export { app }
