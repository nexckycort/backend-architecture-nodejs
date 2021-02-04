import { Request, Response, Application } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import routesV1 from 'api/routes/v1'
import { template } from 'helpers/templates/template'
import { NotFoundError } from 'helpers/api.response'
import { api } from 'config'

export default async ({ app }: { app: Application }): Promise<void> => {
  app.disable('x-powered-by')

  app.use(cors())
  app.use(helmet())
  app.use(compression())

  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }))

  app.use(morgan('dev'))

  app.use(api.prefix, routesV1)
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send(template('welcome to api'))
  })

  app.use((_req, res) => NotFoundError(res))
}
