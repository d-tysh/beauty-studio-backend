import Joi from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ClientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        nameForAdmin: {
            type: String,
            default: ''
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: [true, 'Phone number is required']
        },
        description: {
            type: String,
            default: ''
        },
        discount: {
            type: Number,
            default: 0
        }
    },
    { versionKey: false }
)

export const clientRegisterSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    nameForAdmin: Joi.string().min(2).max(50).allow(''),
    phoneNumber: Joi.string().pattern(/^\+\d{12}$/).required(),
    description: Joi.string().allow(''),
    discount: Joi.number().min(0).max(100)
})

export const clientUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    nameForAdmin: Joi.string().min(2).max(50).allow(''),
    phoneNumber: Joi.string().pattern(/^\+\d{12}$/),
    description: Joi.string().allow(''),
    discount: Joi.number().min(0).max(100)
})

export const Client = mongoose.model('client', ClientSchema);