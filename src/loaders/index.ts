import { Application } from 'express'
import colors from 'colors'

import { pool } from 'loaders/pgPool'
import mongooseLoader from 'loaders/mongoose'
import expressLoader from 'loaders/express'
import Logger from 'helpers/logger'

interface PreLoaders {
  expressApp: Application | undefined
}

interface Loaders {
  expressApp: Application
}

const loaders = async (): Promise<Loaders> => {
  Logger.info(colors.bold.italic.blue('Loading configuration... 💻'))

  const loaders: PreLoaders = {
    expressApp: undefined
  }

  try {
    await pool.connect()
    Logger.info(colors.bold.green('PostgreSQL loaded and connected! ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading or connecting PostgreSQL'), error)
    throw error
  }

  try {
    await mongooseLoader()
    Logger.info(colors.bold.green('MongoDB loaded and connected! ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading or connecting MongoDB'), error)
    throw error
  }

  try {
    loaders.expressApp = expressLoader()
    Logger.info(colors.bold.green('Express loaded ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading Express'), error)
    throw error
  }

  return loaders as Loaders
}

export default loaders
