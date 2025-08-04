import express from 'express';
import adminCtrl from '../controllers/admin.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router
    .post('/register', adminCtrl.register)
    .post('/login', adminCtrl.login)
    .post('/logout', adminCtrl.logout)
    .get('/current', authenticate, adminCtrl.getCurrentAdmin)
    .patch('/update', adminCtrl.update)

export default router;