import { Request, Response, NextFunction, RequestHandler, Router } from 'express'

import { SuccessResponse, BadRequestError, InternalError } from '../../../../helpers/api.response'
import UsersService from '../../../../services/users/users.service'
import { ReqUser } from '../../../../interfaces/user.interfaces'
import validator from '../../../middleware/validator'
import Logger from '../../../../helpers/logger'
import _ from '../../../../helpers/utils'
import schema from './schema'

const router = Router()
const usersService = UsersService.getInstance()

const validateEmailUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.findByEmail(req.body.email)
    if (user !== undefined) return BadRequestError(res, 'User already registered')
    next()
  } catch (error) {
    Logger.error('signup validateEmailUser ', error)
    return InternalError(res)
  }
}

const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqUser: ReqUser = req.body
    const user = await usersService.save(reqUser)
    return SuccessResponse(res, 'Successful registration', { data: _.pick(user, ['id']) })
  } catch (error) {
    Logger.error('signup createUser ', error)
    return InternalError(res)
  }
}

router.post('/', validator(schema.signup), validateEmailUser, createUser)

export default router
