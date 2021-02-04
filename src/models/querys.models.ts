export const findByPk = (identifier: number | string, table: string, options?: { attributes: string[] }): string => {
  let attributes
  if (options !== undefined) {
    attributes = options.attributes
  }
  const q = `SELECT ${attributes === undefined ? '*' : attributes.toString()}
    FROM ${table}
    WHERE id = ${typeof identifier === 'string' ? `'${identifier}'` : identifier}`
  return q
}

export const deleteByPk = (identifier: number | string, table: string): string => {
  const q = `DELETE FROM ${table}
    WHERE id = ${typeof identifier === 'string' ? `'${identifier}'` : identifier}
    RETURNING *`
  return q
}
