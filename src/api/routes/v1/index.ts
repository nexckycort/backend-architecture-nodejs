import { Router } from 'express'

import test from 'api/routes/v1/test'

const router = Router({ caseSensitive: true })

router.use('/test', test)

export default router
