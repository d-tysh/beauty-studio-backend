import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProcedureSchema = new Schema({
    client: {
        clientId: Schema.Types.ObjectId,
        ref: 'client',
        required: [true, 'Client reference is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    procedureName: {
        type: String,
        required: [true, 'Procedure name is required']
    },
    description: String,
    additionalInfo: String,
    price: Number
})

const Procedure = mongoose.model('procedure', ProcedureSchema);

export default Procedure;