import { Request, Response, Router, RequestHandler } from 'express'

import { SuccessOkResponse, InternalError } from 'helpers/api.response'
import validator from 'api/middleware/validator'
import { TestService } from 'services/index'
import schema from './schema'

const router = Router()

const test: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { test } = req.body
    const result = TestService.test(test)
    SuccessOkResponse(res, 'Test successfully', result)
  } catch {
    InternalError(res)
  }
}

router.post('/', validator(schema.test), test)

export default router
