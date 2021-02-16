import { Response } from 'express'

enum StatusCode {
  SUCCESS = '20000',
  FAILURE = '40001'
}

enum TypeErrors {
  TECNICO = 'Tecnico',
  NOTFOUND = 'Not Found',
  INTERNAL_ERROR = 'Internal error',
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Authentication error',
  ECONNREFUSED = 'ECONNREFUSED',
  ECONNABORTED = 'ECONNABORTED',
  ECONNRESET = 'ECONNRESET'
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

export const SuccessResponse = (res: Response, msg = 'OK', data: any = undefined): Response => {
  const body = {
    message: msg,
    StatusCode: StatusCode.SUCCESS
  }
  if (data !== undefined) Object.assign(body, { data })
  return res.status(ResponseStatus.SUCCESS).json(body)
}

export const NotFoundError = (res: Response): Response => {
  return responseError(StatusCode.FAILURE, TypeErrors.NOTFOUND, ResponseStatus.NOT_FOUND, res)
}

export const BadRequestError = (res: Response, message: string = TypeErrors.BAD_REQUEST): Response => {
  return responseError(StatusCode.FAILURE, message, ResponseStatus.BAD_REQUEST, res)
}

export const InternalError = (res: Response): Response => {
  return responseError(StatusCode.FAILURE, TypeErrors.INTERNAL_ERROR, 500, res)
}

export const responseError = (code: string, type: string, statusCode: number, res: Response): Response => {
  return res.status(statusCode).json({
    statusCode: code,
    message: type
  })
}
