import colors from 'colors'

import expressLoader from 'loaders/express'
import Logger from 'helpers/logger'
import { Loaders, PreLoaders } from 'interfaces/server.interfaces'

const loaders = (): Loaders => {
  Logger.info(colors.bold.italic.blue('Loading configuration... 💻'))

  const loaders: PreLoaders = {
    expressApp: undefined
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
