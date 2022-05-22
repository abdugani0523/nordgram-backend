import { Router } from "express";
import { INFO } from '#controllers/info.js'
import checkToken from '#middlewares/checkToken.js'

const router = Router()

router.get('/info', checkToken, INFO);

export default router;