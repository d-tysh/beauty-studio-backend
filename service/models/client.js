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

const Client = mongoose.model('client', ClientSchema);

export default Client;