import { Pool, PoolConfig } from 'pg'
import { pg } from 'config'

const poolConfig: PoolConfig = {
  user: pg.user,
  password: pg.password,
  host: pg.host,
  database: pg.database,
  port: +pg.port,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
  ssl: {
    rejectUnauthorized: pg.ssl
  }
}

export const pool: Pool = new Pool(poolConfig)

pool.on('connect', (client: any): void => {
  // console.info('Connection has been established successfully.')
})

pool.on('error', (error: Error) => {
  console.log('Unable to connect to the database:', error)
})
