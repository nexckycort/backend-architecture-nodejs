import { Router } from 'express'

import signup from 'api/routes/v1/access/signup'
import signin from 'api/routes/v1/access/signin'
// import auth from '../../middleware/auth'

const router = Router({ caseSensitive: true })

router.use('/signup', signup)
router.use('/signin', signin)

export default router
