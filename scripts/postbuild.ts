import fse from 'fs-extra'
import path from 'path'

const projectRoot = path.join(__dirname, '..', 'build', 'package.json')
const packageJSON = fse.readJSONSync(projectRoot)
packageJSON.scripts = {
  start: 'node ./server.js'
}
Reflect.deleteProperty(packageJSON, 'devDependencies')
Reflect.deleteProperty(packageJSON, 'bin')
Reflect.deleteProperty(packageJSON, 'pkg')

fse.writeFileSync(projectRoot, JSON.stringify(packageJSON, null, '  '))
