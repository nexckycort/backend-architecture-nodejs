import { FindOptions, UpdateOptions } from '../interfaces/querys.interfaces'
import { buildSelect, buildInsert, buildUpdate } from '../helpers/querys'
import { pool } from '../loaders/pgPool'
import * as querys from './querys.models'

export default class MasterServices {
  constructor(private readonly table: string) {}

  create = async <T>(o: unknown): Promise<T> => {
    const q = buildInsert(o, this.table)
    const { rows } = await pool.query(q)
    return rows[0] as T
  }

  update = async <T>(options: UpdateOptions): Promise<T> => {
    const q = buildUpdate(options, this.table)
    const { rows } = await pool.query(q)
    return rows[0] as T
  }

  findByPk = async <T>(identifier: number | string, options?: { attributes: string[] }): Promise<T> => {
    const q = querys.findByPk(identifier, this.table, options)
    const { rows } = await pool.query(q)
    return rows[0] as T
  }

  findOne = async <T>(options: FindOptions): Promise<T> => {
    const q = buildSelect(options, this.table)
    const { rows } = await pool.query(q)
    return rows[0] as T
  }

  findAll = async <T>(options?: FindOptions): Promise<T[]> => {
    const q = buildSelect(options, this.table)
    const { rows } = await pool.query(q)
    return rows as T[]
  }

  deleteByPk = async (identifier: number | string): Promise<any> => {
    const q = querys.deleteByPk(identifier, this.table)
    const { rows } = await pool.query(q)
    return rows[0]
  }
}
