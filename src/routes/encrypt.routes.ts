import { Router } from 'express';

import { encryptMessage } from '../controllers/encrypt.controller';

const router = Router();

router.post('/', encryptMessage);

export default router;