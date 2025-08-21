import express from 'express';
import clientCtrl from '../controllers/client.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { clientRegisterSchema, clientUpdateSchema } from '../service/models/client.js';

const router = express.Router();

router.use(authenticate);

router
    .post('/', validateBody(clientRegisterSchema), clientCtrl.register)
    .get('/', clientCtrl.getAllClients)
    .get('/:id', clientCtrl.getClientById)
    .patch('/:id', validateBody(clientUpdateSchema), clientCtrl.update)
    .delete('/:id', clientCtrl.remove);

export default router;