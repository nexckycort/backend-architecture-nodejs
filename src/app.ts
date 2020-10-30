import express, { Request, Response, NextFunction, Application } from 'express'
import compression from 'compression';
import helmet from 'helmet'
import cors from 'cors';
import bodyParser from 'body-parser'
import morgan from 'morgan'

import routesV1 from './routes/v1'
import { template } from './helpers/template'
import { environment } from './config'
import { pool } from './database/pgPool'
import { ApiError, InternalError, NotFoundError } from './core/ApiError'
import db from './database/mongo';

process.on('uncaughtException', (e) => {
  console.log(e)
})

const app: Application = express()

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }))

app.use(morgan('dev'))

app.use('/v1', routesV1)
app.get('/', (req: Request, res: Response) => {
  res.status(200).send(template('welcome to api'))
})

app.use((req, res, next) => next(new NotFoundError()))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res)
  } else {
    if (environment === 'development') {
      console.log(err)
      return res.status(500).send(err.message)
    }
    ApiError.handle(new InternalError(), res)
  }
})

pool.connect()
  .then()
  .catch((error: any) => console.log(`ERROR: ${error.message || error}`))

db.once('open', function () {
  console.log('The connection to MongoDB was successful.');
});

export default app
