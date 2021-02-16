import { Application } from 'express'

export interface PreLoaders {
  expressApp: Application | undefined
}

export interface Loaders {
  expressApp: Application
}
