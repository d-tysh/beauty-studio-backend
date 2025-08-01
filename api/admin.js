import express from 'express';
import adminCtrl from '../controllers/admin.js';

const router = express.Router();

router
    .post('/register', adminCtrl.register)
    .post('/login', adminCtrl.login)
    .post('/logout', adminCtrl.logout)
    .get('/current', adminCtrl.getCurrentAdmin)

export default router;