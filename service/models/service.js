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

const Service = mongoose.model('service', ServiceSchema);

export default Service;