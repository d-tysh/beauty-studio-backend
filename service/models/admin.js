import mongoose from "mongoose";
import { ADMIN_STATUS } from "../../constants.js";
import Joi from "joi";

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        login: {
            type: String,
            required: [true, 'Login is required'],
            unique: true
        },
        email: {
            type: String,
            unique: true,
            default: ''
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        status: {
            type: String,
            enum: [ADMIN_STATUS.BASIC, ADMIN_STATUS.PRO],
            default: ADMIN_STATUS.BASIC
        },
        token: {
            type: String,
            default: ''
        }
    },
    { versionKey: false }
)

export const adminRegisterSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    login: Joi.string().min(2).max(30).pattern(/^\S+$/).required(),
    email: Joi.string().email().allow(''),
    password: Joi.string().min(6).max(30).pattern(/^\S+$/).required()
})

export const adminLoginSchema = Joi.object({
    login: Joi.string().min(2).max(30).pattern(/^\S+$/).required(),
    password: Joi.string().min(6).max(30).pattern(/^\S+$/).required()
})

export const adminUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    login: Joi.string().min(2).max(30).pattern(/^\S+$/),
    email: Joi.string().email().allow(''),
    password: Joi.string().min(6).max(30).pattern(/^\S+$/),
    status: Joi.string().valid(ADMIN_STATUS.PRO, ADMIN_STATUS.BASIC)
})

export const Admin = mongoose.model('admin', AdminSchema);