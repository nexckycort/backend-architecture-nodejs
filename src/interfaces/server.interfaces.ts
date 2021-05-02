import { Application } from 'express'

export interface PreLoaders {
  server: Application | undefined
}

export interface Loaders {
  server: Application
}

export enum ERROR_HANDLERS {
  SYNTAX_ERROR = 'entity.parse.failed',
  PAYLOAD_TOO_LARGE = 'entity.too.large'
}
