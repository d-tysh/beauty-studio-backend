import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from "../service/models/admin.js";
import controllerWrapper from '../decorators/controllerWrapper.js';

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
        throw new Error(`Login or password is incorrect`)
    }

    const isMatchPassword = await bcrypt.compare(password, admin.password);
    if (!isMatchPassword) {
        throw new Error(`Login or password is incorrect`);
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
        maxAge: 1000 * 60 * 60
    })

    return res.json(data)
}

const getCurrentAdmin = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        throw new Error('Unautorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY)

    const admin = await Admin.findById(id, '-password -token');

    return res.status(200).json({
        name: admin.name,
        login: admin.login,
        email: admin.email,
        status: admin.status
    })
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
    const { token } = req.cookies;

    if (!token) {
        throw new Error('Unautorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const result = await Admin.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(201).json({
        message: 'Successfully updated',
        result: {
            name: result.name,
            login: result.login,
            email: result.email,
            status: result.status
        }
    })
}

export default {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    logout: controllerWrapper(logout),
    getCurrentAdmin: controllerWrapper(getCurrentAdmin),
    update: controllerWrapper(update)
};