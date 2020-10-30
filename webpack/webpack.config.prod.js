const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    main: [
      path.join(__dirname, '../prebuild/bin/www.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'server.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
