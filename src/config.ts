if (!process.env.NODE_ENV) require('dotenv').config()

export const environment = process.env.NODE_ENV
export const port = process.env.PORT

export const pgUser = process.env.PGUSER
export const pgPassword = process.env.PGPASSWORD
export const pgHost = process.env.PGHOST
export const pgDatabase = process.env.PGDATABASE
export const pgPort = parseInt(process.env.PGPORT)
export const pgSsl = (process.env.SSL === 'false') ? false : true

export const emailUser = process.env.EMAILUSER
export const emailPassword = process.env.EMAILPASSWORD
export const emailHost = process.env.EMAILHOST
export const emailPort = process.env.EMAILPORT

export const urlClient = process.env.URL_CLIENT

export const secretKey = process.env.SECRETKEY
