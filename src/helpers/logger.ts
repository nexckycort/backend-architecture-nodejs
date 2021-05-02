const Logger = {
  info: (...args: unknown[]): void => {
    args.forEach((arg) => {
      console.log(arg)
    })
  },
  error: (msg: string, e: Error | string = ''): void => {
    console.log(`⚠️  ${msg} ⚠️ `, e)
  }
}

export default Logger
