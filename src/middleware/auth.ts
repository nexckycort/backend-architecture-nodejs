import { Request, Response, NextFunction, Router } from 'express'
import jwt from 'jsonwebtoken'

import { secretKey } from '../config'
import { AuthFailureError, InternalError } from '../core/ApiError'

const router = Router()

export default router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) return next(new AuthFailureError('Authorization Header Validation'))

  const token = authHeader.split(' ')[1]
  let revisarToken
  try {
    revisarToken = jwt.verify(token, secretKey)
  } catch (error) {
    return next(new AuthFailureError('Not Authorized'))
  }

  if (!revisarToken) return next(new AuthFailureError('Not Authorized'))
  next()
})
