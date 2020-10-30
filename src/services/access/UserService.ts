import { QueryResult } from 'pg'
import { pool } from '../../database/pgPool'
import { Iuser } from '../../interfaces/Iuser'

export default class UserService {
  public static create(user: Iuser): Promise<QueryResult<any>> {
    const { name, email, password, type } = user

    return pool.query(`INSERT INTO public.usuarios
      (nombre, email, "password", tipo) 
      VALUES ($1,$2,$3,$4) RETURNING id;`,
      [name, email, password, type])
  }

  public static findByEmail(email: string): Promise<QueryResult<any>> {
    return pool.query(`SELECT id, nombre, "password", email FROM usuarios WHERE email = $1`,
      [email])
  }
}
