import { Request, Response, Router } from 'express'
import TestService from '../../../services/tests/TestService'

const router = Router()

export default router.post('/', async (req: Request, res: Response) => {
  await TestService.deleteUserByEmail(req.body.email)
  res.status(200).json({ test: 'ok' })
})
