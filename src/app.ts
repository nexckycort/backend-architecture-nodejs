/* eslint-disable import/first */
process.stdout.write('\x1Bc')
import colors from 'colors'
import http from 'http'

import { name, port } from 'config'
import loaders from 'loaders'

const { server: app } = loaders()

app.set('port', port)

const server = http.createServer(app)

server
  .listen(port, () => {
    console.info(`${colors.yellow('########################################################')}
🛡️  ${colors.bold.green(`Server ${colors.blue(name)} listening on port:`)} ${colors.bold.blue(port)} 🛡️
${colors.yellow('########################################################')}`)
  })
  .on('error', (e) => console.error('error in server.listen ', e))
