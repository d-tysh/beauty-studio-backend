import express from 'express';
import serviceCtrl from '../controllers/service.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { serviceAddSchema, serviceUpdateSchema } from '../service/models/service.js';

const router = express.Router();

router.use(authenticate);

router
    .post('/', validateBody(serviceAddSchema), serviceCtrl.add)
    .get('/', serviceCtrl.getAllServices)
    .get('/:id', serviceCtrl.getServiceById)
    .patch('/:id', validateBody(serviceUpdateSchema), serviceCtrl.update)
    .delete('/:id', serviceCtrl.remove);

export default router;