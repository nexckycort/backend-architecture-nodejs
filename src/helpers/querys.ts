import { FindOptions, UpdateOptions } from 'interfaces/querys.interfaces'

export const buildSelect = (options: FindOptions | undefined, table: string): string => {
  let attributes: any
  let where: any
  if (options !== undefined) {
    attributes = options.attributes
    where = Object.keys(options.where).length > 0 ? options.where : undefined
  }
  let whereBuilt = ''
  if (where !== undefined) {
    whereBuilt = 'WHERE '
    Object.entries(where).forEach(([key, value]) => {
      const dato = typeof value === 'string' ? `= '${value}'` : value === null ? ' IS NULL' : `=${value}`
      whereBuilt += key + dato + ' AND '
    })
    whereBuilt = whereBuilt.slice(0, whereBuilt.length - 4)
  }

  const q = `SELECT ${attributes === undefined ? '*' : attributes.toString()} 
    FROM ${table}
    ${whereBuilt}`
  return q
}

export const buildInsert = (o: any, table: string): string => {
  let keys = ''
  let values = ''

  Object.entries(o).forEach(([key, value]) => {
    keys += `${key},`
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    values += `${typeof value === 'object' && value !== null ? `'${JSON.stringify(value)}'` : typeof value === 'string' ? `'${value}'` : value},`
  })
  keys = keys.slice(0, keys.length - 1)
  values = values.slice(0, values.length - 1)

  const q = `INSERT INTO ${table}
  (${keys}) 
  VALUES (${values}) RETURNING *`
  return q
}

export const buildUpdate = (options: UpdateOptions, table: string): string => {
  delete options.o.id
  let whereBuilt = 'WHERE '
  Object.entries(options.where).forEach(([key, value]) => {
    const dato = typeof value === 'string' ? `= '${value}'` : value === null ? ' IS NULL' : `=${value}`
    whereBuilt += key + dato + ' AND '
  })
  whereBuilt = whereBuilt.slice(0, whereBuilt.length - 4)

  let values = ''
  Object.entries(options.o).forEach(([key, value]) => {
    values += `${key}=${typeof value === 'object' && value !== null ? `'${JSON.stringify(value)}'` : typeof value === 'string' ? `'${value}'` : value}, `
  })
  values = values.slice(0, values.length - 2)

  const q = `UPDATE ${table}
  SET ${values}
  ${whereBuilt} RETURNING *`
  return q
}
