import 'express-async-errors'
import cors from 'cors'
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import { routes } from './routes/index.routes'
import 'dotenv/config'
import * as Sentry from '@sentry/node'
import { InitializeAlgolia } from './Infra/startups/InitializeAlgolia'
import { RegisterJobs } from './application/RegisterJobs'
// import { InitializeElastic } from './Infra/startups/InitializeElastic'

const app = express()

app.use(cors())
app.use(express.json())

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

InitializeAlgolia()
// InitializeElastic()

RegisterJobs()

app.use(routes)

app.use(Sentry.Handlers.errorHandler())

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

export { app }
