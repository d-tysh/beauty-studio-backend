import Joi from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProcedureSchema = new Schema(
    {
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'admin',
            required: [true, 'Admin reference is required']
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: 'client',
            required: [true, 'Client reference is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        procedureName: {
            type: String,
        },
        description: [{
            type: Schema.Types.ObjectId,
            ref: 'service'
        }],
        additionalInfo: String,
        price: Number
    },
    { versionKey: false }
)

export const procedureAddSchema = Joi.object({
    client: Joi.string().required(),
    date: Joi.string().required(),
    procedureName: Joi.string().allow(''),
    description: Joi.array().items(Joi.string()).required(),
    additionalInfo: Joi.string().allow(''),
    price: Joi.number().min(0).required()
})

export const procedureUpdateSchema = Joi.object({
    client: Joi.string().optional(),
    date: Joi.string().optional(),
    procedureName: Joi.string().optional(),
    description: Joi.array().items(Joi.string()).optional(),
    additionalInfo: Joi.string().optional(),
    price: Joi.number().min(0).optional()
})

export const Procedure = mongoose.model('procedure', ProcedureSchema);