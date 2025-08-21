import Joi from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        serviceName: {
            type: String,
            required: [true, 'Service name is required']
        },
        description: String,
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        time: {
            type: Number,
            required: [true, 'Time is required']
        },
    },
    { versionKey: false }
)

export const serviceAddSchema = Joi.object({
    serviceName: Joi.string().min(2).required(),
    description: Joi.string().allow(''),
    price: Joi.number().min(0).required(),
    time: Joi.number().min(0).required()
})

export const serviceUpdateSchema = Joi.object({
    serviceName: Joi.string().min(2),
    description: Joi.string().allow(''),
    price: Joi.number().min(0),
    time: Joi.number().min(0)
})

export const Service = mongoose.model('service', ServiceSchema);