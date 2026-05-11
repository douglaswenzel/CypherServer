import { Router } from "express"

import { decryptMessage } from "../controllers/decrypt.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.post("/", authMiddleware, decryptMessage)

export default router
