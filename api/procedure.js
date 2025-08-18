import express from 'express';
import procedureCtrl from '../controllers/procedure.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router
    .post('/', procedureCtrl.add)
    .get('/', procedureCtrl.getAllProcedures)
    .get('/:id', procedureCtrl.getProcedureById)
    .patch('/:id', procedureCtrl.update)
    .delete('/:id', procedureCtrl.remove);

export default router;