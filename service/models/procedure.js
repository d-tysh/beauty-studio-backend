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

const Procedure = mongoose.model('procedure', ProcedureSchema);

export default Procedure;