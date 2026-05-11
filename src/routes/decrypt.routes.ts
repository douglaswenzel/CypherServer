    import { Router } from 'express';

import { decryptMessage } from '../controllers/decrypt.controller';

const router = Router();

router.post('/', decryptMessage);

export default router;