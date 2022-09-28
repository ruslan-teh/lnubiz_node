import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.get('/:id', userController.getUserById);

export const userRouter = router;
