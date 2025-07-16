import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    login: {
        type: String,
        required: [true, 'Login is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    status: {
        type: String,
        enum: ['basic', 'pro'],
        default: 'basic'
    }
})

const Admin = mongoose.model('admin', AdminSchema);

export default Admin;