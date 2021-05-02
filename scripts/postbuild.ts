import fse from 'fs-extra'
import path from 'path'

const projectRoot = path.join(__dirname, '..', 'build', 'package.json')
const packageJSON = fse.readJSONSync(projectRoot)
packageJSON.scripts = {
  start: 'node ./server.js',
  pkg: 'pkg ./package.json --output ./pkg/server'
}
Reflect.deleteProperty(packageJSON, 'devDependencies')

fse.writeFileSync(projectRoot, JSON.stringify(packageJSON, null, '  '))
