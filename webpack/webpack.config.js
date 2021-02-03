module.exports = (env) => {
  return require(`./webpack.config.${env.COMPILE}.js`)
}
