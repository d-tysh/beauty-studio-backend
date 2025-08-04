import jwt from 'jsonwebtoken';
import { Admin } from '../service/models/admin.js';
import HttpError from '../helpers/HttpError.js';

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
    try {
        const { token = '' } = req.cookies;
        
        if (!token) {
            return next(HttpError(401));
        }

        const { id } = jwt.verify(token, SECRET_KEY);
        const admin = await Admin.findById(id, '-password -token');
        
        if (!admin) {
            return next(HttpError(404));
        }
        
        req.user = admin;
        next();
    } catch (error) {
        next(error);
    }
}

export default authenticate;