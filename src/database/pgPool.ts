import { Pool, PoolConfig, } from 'pg'
import { pgDatabase, pgHost, pgPassword, pgPort, pgSsl, pgUser } from '../config'

const poolConfig: PoolConfig = {
  user: pgUser,
  password: pgPassword,
  host: pgHost,
  database: pgDatabase,
  port: pgPort,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 9000,
  ssl: {
    rejectUnauthorized: pgSsl
  }
}

export const pool: Pool = new Pool(poolConfig)

pool.on('connect', (client: any): void => {
  console.info('Connection has been established successfully.')
})

pool.on('error', (error: Error) => {
  console.log('Unable to connect to the database:', error)
})
