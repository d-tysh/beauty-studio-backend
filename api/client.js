import express from 'express';
import clientCtrl from '../controllers/client.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router
    .post('/', authenticate, clientCtrl.register)
    .get('/', authenticate, clientCtrl.getAllClients)
    .get('/:id', authenticate, clientCtrl.getClientById)
    .patch('/:id', authenticate, clientCtrl.update)
    .delete('/:id', authenticate, clientCtrl.remove);

export default router;