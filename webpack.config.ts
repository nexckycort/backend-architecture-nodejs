import path from 'path'
import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
const {
  compilerOptions: { paths: tsconfigPaths }
} = require('./tsconfig.json')

const paths = Object.assign(
  {},
  ...Object.keys(tsconfigPaths).map((key) => {
    const keyTemp = key.includes('/*') ? key.slice(0, -2) : key
    const pathUrl = `${path.join(__dirname, 'src/', tsconfigPaths[key][0])}`
    const valueTemp = pathUrl.includes('/*') ? pathUrl.slice(0, -1) : `${pathUrl}/`
    return {
      [keyTemp]: valueTemp
    }
  })
)

const config: Configuration = {
  entry: path.join(__dirname, 'src/app.ts'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    alias: paths,
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }
    ]
  }
}

export default config
