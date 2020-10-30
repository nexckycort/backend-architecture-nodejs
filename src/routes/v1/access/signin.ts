import { Request, Response, NextFunction, Router } from 'express'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import { SuccessResponse } from '../../../core/ApiResponse'
import { secretKey } from '../../../config'
import { AuthFailureError, BadRequestError } from '../../../core/ApiError'
import UserService from '../../../services/access/UserService'
import validator from '../../../helpers/validator'
import schema from './schema'

const router = Router()

export default router.post('/', validator(schema.userCredential), async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const { rows } = await UserService.findByEmail(email)
  const user = rows[0]

  if (!user) return next(new BadRequestError('User not registered'))

  const match = await bcrypt.compare(password, user.password)
  if (!match) return next(new AuthFailureError('Authentication failure'))

  const token = jwt.sign({
    email: user.email,
    nombre: user.nombre,
    id: user.id
  }, secretKey, { expiresIn: '1h' })

  new SuccessResponse('Sign in Success', {
    user: _.pick(user, ['id', 'nombre', 'email']),
    tokens: token,
  }).send(res)
})
