import express from 'express';
import clientCtrl from '../controllers/client.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router
    .post('/', clientCtrl.register)
    .get('/', clientCtrl.getAllClients)
    .get('/:id', clientCtrl.getClientById)
    .patch('/:id', clientCtrl.update)
    .delete('/:id', clientCtrl.remove);

export default router;