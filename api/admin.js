import express from 'express';
import adminCtrl from '../controllers/admin.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { adminLoginSchema, adminRegisterSchema, adminUpdateSchema } from '../service/models/admin.js';

const router = express.Router();

router
    .post('/register', validateBody(adminRegisterSchema), adminCtrl.register)
    .post('/login', validateBody(adminLoginSchema), adminCtrl.login)
    .post('/logout', adminCtrl.logout)
    .get('/current', authenticate, adminCtrl.getCurrentAdmin)
    .get('/all', authenticate, adminCtrl.getAllAdmins)
    .get('/:id', authenticate, adminCtrl.getAdminById)
    .patch('/update', authenticate, validateBody(adminUpdateSchema), adminCtrl.update)

export default router;