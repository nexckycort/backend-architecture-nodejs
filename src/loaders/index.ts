import colors from 'colors'

import { Loaders, PreLoaders } from 'interfaces/server.interfaces'
import serverLoader from 'loaders/server'
import { environment } from 'config'
import Logger from 'helpers/logger'

const loaders = (): Loaders => {
  Logger.info(colors.bold.italic.blue('Loading configuration... 💻'))
  const environmentMsg = `${colors.bold.magenta('Environment:')} ${colors.italic.bold.yellow(environment)}`
  Logger.info(environmentMsg)

  const loaders: PreLoaders = {
    server: undefined
  }

  try {
    loaders.server = serverLoader()
    Logger.info(colors.bold.green('Server loaded ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading Server'), error)
    throw error
  }

  return loaders as Loaders
}

export default loaders
