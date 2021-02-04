export default {
  info: (msg: unknown = 'SUCCESS'): void => {
    console.log(msg)
  },
  error: (msg: string, e: Error | string = ''): void => {
    console.log(`⚠️  ${msg} ⚠️ `, e)
  }
}
