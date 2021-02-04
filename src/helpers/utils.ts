export default {
  pick: <T>(object: unknown, propiedades: string[]): T => {
    return JSON.parse(JSON.stringify(object, propiedades)) as T
  }
}
