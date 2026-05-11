import { Router } from "express"

import { encryptMessage } from "../controllers/encrypt.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.post("/", authMiddleware, encryptMessage)

export default router
