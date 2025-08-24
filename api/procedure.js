import express from 'express';
import procedureCtrl from '../controllers/procedure.js';
import authenticate from '../middlewares/authenticate.js';
import { procedureAddSchema, procedureUpdateSchema } from '../service/models/procedure.js';
import validateBody from '../middlewares/validateBody.js';

const router = express.Router();

router.use(authenticate);

router
    .post('/', validateBody(procedureAddSchema), procedureCtrl.add)
    .get('/', procedureCtrl.getAllProcedures)
    .get('/:id', procedureCtrl.getProcedureById)
    .patch('/:id', validateBody(procedureUpdateSchema), procedureCtrl.update)
    .delete('/:id', procedureCtrl.remove);

export default router;