import dotenv from 'dotenv'

const envFound = dotenv.config()
if (envFound.error !== undefined) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

// Mapper for environment variables
export const environment = process.env.NODE_ENV
export const port = process.env.PORT ?? ''
export const name = process.env.NAME_API ?? ''

export const keyHttps = process.env.KEY_HTTPS ?? ''
export const fullChainHttps = process.env.FULL_CHAIN_HTTPS ?? ''

export const pg = {
  database: process.env.PGDATABASE ?? '',
  host: process.env.PGHOST ?? '',
  port: process.env.PGPORT ?? '',
  user: process.env.PGUSER ?? '',
  password: process.env.PGPASSWORD ?? '',
  ssl: process.env.SSL !== 'false'
}

export const email = {
  host: process.env.EMAIL_HOST ?? '',
  port: process.env.EMAIL_PORT ?? '',
  user: process.env.EMAIL_USER ?? '',
  password: process.env.EMAIL_PASSWORD ?? ''
}

export const mongodbUri = process.env.DATABASE_MONGO ?? ''

export const urlClient = process.env.URL_CLIENT ?? ''

export const corsUrl = process.env.CORS_URL

export const secretKey = process.env.SECRETKEY ?? ''

export const api = {
  prefix: '/api/v1.0'
}

export const emailUser = process.env.EMAILUSER ?? ''
export const emailPassword = process.env.EMAILPASSWORD ?? ''
export const emailHost = process.env.EMAILHOST ?? ''
export const emailPort = process.env.EMAILPORT ?? ''
