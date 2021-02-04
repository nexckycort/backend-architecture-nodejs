import { Router } from 'express'

import signup from './access/signup'
import signin from './access/signin'
// import auth from '../../middleware/auth'

const router = Router({ caseSensitive: true })

router.use('/signup', signup)
router.use('/signin', signin)

export default router
