import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from "../service/models/admin.js";
import controllerWrapper from '../decorators/controllerWrapper.js';
import { ADMIN_STATUS } from '../constants.js';
import HttpError from '../helpers/HttpError.js';
import mongoose from 'mongoose';

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { login, email } = req.body;

    const adminLogin = await Admin.findOne({ login });

    if (adminLogin) {
        throw new Error(`Admin with login "${login}" already exists`)
    }

    const adminEmail = await Admin.findOne({ email });

    if (adminEmail) {
        throw new Error(`Admin with login "${email}" already exists`)
    }

    const password = await bcrypt.hash(req.body.password, 10);
    await Admin.create({ ...req.body, password });

    return res.status(201).json({
        message: `Admin "${login}" registered successfully`
    })
}

const login = async (req, res) => {
    const { login, password } = req.body;

    const admin = await Admin.findOne({ login });
    if (!admin) {
        throw HttpError(403, `Login or password is incorrect`);
    }

    const isMatchPassword = await bcrypt.compare(password, admin.password);
    if (!isMatchPassword) {
        throw HttpError(403, `Login or password is incorrect`);
    }

    const { _id: id } = admin;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    const result = await Admin.findByIdAndUpdate(id, { token }, { new: true });
    const data = {
        message: 'Authorized',
        data: {
            id,
            name: result.name,
            login: result.login,
            email: result.email,
            status: result.status
        }
    }

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    })

    return res.json(data)
}

const getCurrentAdmin = async (req, res) => {
    const { user } = req;

    return res.status(200).json({
        id: user._id,
        name: user.name,
        login: user.login,
        email: user.email,
        status: user.status
    })
}

const getAdminById = async (req, res) => {
    const { id } = req.params;
    
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        throw HttpError(400);
    }
    
    const result = await Admin.findById(id, '-token -password');
    if (!result) {
        throw HttpError(404, 'User not found');
    }

    return res.status(201).json(result);
}

const logout = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        throw new Error('Unautorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY)

    await Admin.findByIdAndUpdate(id, { token: '' });

    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })

    return res.json({
        message: 'Logout successful'
    })
}

const update = async (req, res) => {
    const { _id: id, status } = req.user;
    const { id: paramsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paramsId)) {
        throw HttpError(400, 'Invalid ID format');
    }

    if (!id.equals(paramsId) && status !== ADMIN_STATUS.PRO) {
        throw HttpError(403);
    }

    const result = await Admin.findByIdAndUpdate(paramsId, req.body, { new: true });

    if (!result) {
        throw HttpError(404);
    }

    return res.status(200).json({
        message: 'Successfully updated',
        result: {
            name: result.name,
            login: result.login,
            email: result.email,
            status: result.status
        }
    })
}

const getAllAdmins = async (req, res) => {
    const { status } = req.user;

    if (status !== ADMIN_STATUS.PRO) {
        throw HttpError(403);
    }

    const result = await Admin.find({}, '-token -password');

    return res.status(200).json({
        count: result.length,
        result
    })
}

export default {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    logout: controllerWrapper(logout),
    getCurrentAdmin: controllerWrapper(getCurrentAdmin),
    getAdminById: controllerWrapper(getAdminById),
    getAllAdmins: controllerWrapper(getAllAdmins),
    update: controllerWrapper(update)
};