import path from 'path'
import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

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
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      config: path.resolve(__dirname, 'src/config/'),
      handlers: path.resolve(__dirname, 'src/handlers/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      interfaces: path.resolve(__dirname, 'src/interfaces/'),
      jobs: path.resolve(__dirname, 'src/jobs/'),
      lib: path.resolve(__dirname, 'src/lib/'),
      loaders: path.resolve(__dirname, 'src/loaders/'),
      models: path.resolve(__dirname, 'src/models/'),
      services: path.resolve(__dirname, 'src/services/')
    },
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
