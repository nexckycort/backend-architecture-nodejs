import { Request, Response, Router, RequestHandler } from 'express'

import { SuccessResponse, InternalError } from 'helpers/api.response'
import TestService from 'services/test/test.service'
import validator from 'api/middleware/validator'
import schema from './schema'

const router = Router()
const testService = TestService.getInstance()

const test: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { test } = req.body
    const result = testService.test(test)
    return SuccessResponse(res, 'Test successfully', result)
  } catch (error) {
    return InternalError(res)
  }
}

router.post('/', validator(schema.test), test)

export default router
