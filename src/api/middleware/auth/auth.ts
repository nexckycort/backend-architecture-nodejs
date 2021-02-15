import { Request, Response, NextFunction, Router } from 'express'
import jwt from 'jsonwebtoken'

import { AuthFailureError } from '../../../helpers/api.response'
import validator, { ValidationSource } from '../../middleware/validator'
import schema from '../../middleware/auth/schema'
import Logger from '../../../helpers/logger'
import { secretKey } from '../../../config'

const router = Router()

export default router.use('/', validator(schema.headers, ValidationSource.HEADER), (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization') as string

  const [, token] = authHeader.split(' ')
  try {
    jwt.verify(token, secretKey)
  } catch (error) {
    if (String(error).includes('invalid token')) {
      return AuthFailureError(res, 'Token is not valid')
    }
    if (String(error).includes('jwt expired')) return AuthFailureError(res, 'Token is expired')
    Logger.error(error)
    return AuthFailureError(res)
  }

  req.body.session = jwt.decode(token)
  next()
})
