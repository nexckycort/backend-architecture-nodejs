import express, { Request, Response, Application, NextFunction } from 'express'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import colors from 'colors'
import cors from 'cors'

import { BadRequestError, NotFoundError, PayloadTooLargeError } from 'helpers/api.response'
import { ERROR_HANDLERS } from 'interfaces/server.interfaces'
import { api, corsUrl } from 'config'
import routesV1 from 'api/routes/v1'
import Logger from 'helpers/logger'

export default (): Application => {
  const app = express()
  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet())

  // validate status
  app.get('/status', (_req, res) => {
    res.status(200).end()
  })

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy')

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json({ limit: '2mb' }))
  app.use(express.urlencoded({ limit: '2mb', extended: true, parameterLimit: 50000 }))

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))

  // Gzip compression can greatly decrease the size of the response body
  app.use(compression())

  // HTTP request logger middleware
  app.use(morgan('dev'))

  // Load API route
  app.use(api.prefix, routesV1)

  // catch 404 and forward to error handler
  app.use((_req: Request, res: Response) => NotFoundError(res))

  // error handlers
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err !== undefined) {
      switch (err.type) {
        case ERROR_HANDLERS.SYNTAX_ERROR:
          BadRequestError(res, 'SyntaxError')
          break
        case ERROR_HANDLERS.PAYLOAD_TOO_LARGE:
          PayloadTooLargeError(res)
          break
        default:
          BadRequestError(res)
          Logger.error(colors.red('error handlers'), err)
          break
      }
      return
    }
    next()
  })

  return app
}
