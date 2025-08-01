import mongoose from "mongoose";

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
            enum: ['basic', 'pro'],
            default: 'basic'
        },
        token: {
            type: String,
            default: ''
        }
    },
    { versionKey: false }
)

export const Admin = mongoose.model('admin', AdminSchema);