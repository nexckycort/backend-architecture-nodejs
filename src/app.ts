import colors from 'colors'
import http from 'http'

import { name, port } from './config'
import loaders from './loaders'

async function startServer(): Promise<void> {
  const { expressApp: app } = await loaders()

  app.set('port', port)

  const server = http.createServer(app)

  server
    .listen(port, () => {
      console.info(`${colors.yellow('########################################################')}
🛡️  ${colors.bold.green(`Server ${colors.blue(name)} listening on port:`)} ${colors.bold.blue(port)} 🛡️
${colors.yellow('########################################################')}`)
    })
    .on('error', (e) => console.error('error in server.listen ', e))
}

startServer().catch((error: Error) => console.error(colors.red('error when starting the api'), error))
