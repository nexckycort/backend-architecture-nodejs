import { QueryResult } from 'pg'
import { pool } from '../../loaders/pgPool'

export default class TestService {
  public static deleteUserByEmail(email: string): Promise<QueryResult<any>> {
    return pool.query(`DELETE FROM public.usuarios WHERE email = $1`, [email])
  }
}
