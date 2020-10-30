import { Request, Response, NextFunction, RequestHandler, Router } from 'express'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import { SendMailOptions } from 'nodemailer'

import schema from './schema'

import UserService from '../../../services/access/UserService'
import validator from '../../../helpers/validator'
import { BadRequestError, InternalError } from '../../../core/ApiError'
import { SuccessResponse } from '../../../core/ApiResponse'
import { SendEmail } from '../../../handlers/email'
import { Iuser } from '../../../interfaces/Iuser'
import { confirmAccountHtml, confirmAccountText } from '../../../helpers/templates/emails/confirmAccount'
import { urlClient } from '../../../config'

const router = Router()

const validateEmailUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rowCount } = await UserService.findByEmail(req.body.email)
    if (rowCount > 0) {
      next(new BadRequestError('User already registered'))
    }
    next()
  } catch (error) {
    console.log(error)
    next(new InternalError())
  }
}

const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10)

    req.body.type = req.body.type || 0
    req.body.password = passwordHash
    const user: Iuser = req.body

    const { rows } = await UserService.create(user)

    const url = `${urlClient}/jkdfsgkjfgbdsfjkagh`
    const optionsEmail: SendMailOptions = {
      to: user.email,
      subject: 'Confirma tu cuenta de workshops',
      text: confirmAccountText(url),
      html: confirmAccountHtml(url)
    }

    SendEmail(optionsEmail)

    new SuccessResponse('Signup Successful', {
      user: _.pick(rows[0], ['id'])
    }).send(res)
  } catch (error) {
    console.log(error)
    next(new InternalError())
  }
}

export default router.post('/', validator(schema.signup), validateEmailUser, createUser)
