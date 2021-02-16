import express, { Request, Response, Application, NextFunction } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import routesV1 from 'api/routes/v1'
import { template } from 'helpers/templates/template'
import { BadRequestError, NotFoundError } from 'helpers/api.response'
import { api, corsUrl } from 'config'

export default (): Application => {
  const app = express()

  app.disable('x-powered-by')

  app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))
  app.use(helmet())
  app.use(compression())

  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }))

  app.use(morgan('dev'))

  app.use(api.prefix, routesV1)
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).send(template('welcome to api'))
  })

  app.use((_req, res) => NotFoundError(res))

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err !== undefined) return BadRequestError(res)
    next()
  })

  return app
}
