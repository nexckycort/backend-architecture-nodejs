import Joi, { StringSchema } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from 'helpers/api.response'

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params'
}

export const JoiAuthBearer = (): StringSchema =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid')
    if (value.split(' ')[1] === '') return helpers.error('any.invalid')
    return value
  }, 'Authorization Header Validation')

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req[source])

  if (error === undefined) return next()

  const { details } = error
  const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',')

  return BadRequestError(res, message)
}
