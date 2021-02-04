import { Application } from 'express'
import colors from 'colors'

import { pool } from './pgPool'
import mongooseLoader from './mongoose'
import expressLoader from './express'
import Logger from '../helpers/logger'

export default async ({ expressApp }: { expressApp: Application }): Promise<void> => {
  Logger.info(colors.bold.italic.blue('Loading configuration... 💻'))

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
    await expressLoader({ app: expressApp })
    Logger.info(colors.bold.green('Express loaded ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading Express'), error)
    throw error
  }
}
