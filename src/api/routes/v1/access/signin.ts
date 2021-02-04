import { Request, Response, Router, RequestHandler } from 'express'

import { SuccessResponse, AuthFailureError, BadRequestError, InternalError } from 'helpers/api.response'
import UsersService from 'services/users/users.service'
import validator from 'api/middleware/validator'
import Logger from 'helpers/logger'
import _ from 'helpers/utils'
import schema from './schema'

const router = Router()
const usersService = UsersService.getInstance()

const signin: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await usersService.findByEmail(email)
    if (user === undefined) return BadRequestError(res, 'User not registered')

    const match = await usersService.comparePassword(password, user.password)
    if (!match) return AuthFailureError(res, 'Incorrect password')

    const token = usersService.signToken({
      email: user.email,
      nombre: user.name,
      id: user.id
    })

    return SuccessResponse(res, 'Signin successfully', {
      data: {
        user: _.pick(user, ['id', 'name']),
        token
      }
    })
  } catch (error) {
    Logger.error('signin signin ', error)
    return InternalError(res)
  }
}

router.post('/', validator(schema.signin), signin)

export default router
