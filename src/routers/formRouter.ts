import { Router } from 'express';
import { formController } from '../controllers';

const router = Router();

router.post('/', formController.createForm);
router.get('/form', formController.getAllForms);
router.get('/:id', formController.getFormById);
router.delete('/:id', formController.deleteById);
router.put('/:id', formController.changeStatus);

export const formRouter = router;
