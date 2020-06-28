import { Router } from 'https://deno.land/x/oak/mod.ts'

import handlersHome from './home.ts'
import aboutController from './about.ts'

const router = new Router();

router
  .get('/about', aboutController.Index)
  .get('/about/:id', aboutController.Detail)
  .get('/', handlersHome)

export default router;