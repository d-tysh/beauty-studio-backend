import express from 'express';
import serviceCtrl from '../controllers/service.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router
    .post('/', serviceCtrl.add)
    .get('/', serviceCtrl.getAllServices)
    .get('/:id', serviceCtrl.getServiceById)
    .patch('/:id', serviceCtrl.update)
    .delete('/:id', serviceCtrl.remove);

export default router;