import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    nameForAdmin: String,
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
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
    discount: Number
})

const Client = mongoose.model('client', ClientSchema);

export default Client;