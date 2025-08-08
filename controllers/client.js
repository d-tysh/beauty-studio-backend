import controllerWrapper from "../decorators/controllerWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Client from "../service/models/client.js";

const register = async (req, res) => {
    const { phoneNumber } = req.body;

    const clientByPhone = await Client.findOne({ phoneNumber });

    if (clientByPhone) {
        throw HttpError(409, `Client with phone number ${phoneNumber} already exists`)
    }

    const result = await Client.create(req.body);

    return res.status(201).json({
        message: `Client added: ${result.name}`
    })
}

const getAllClients = async (_, res) => {
    const result = await Client.find();

    return res.status(200).json({
        count: result.length,
        data: result
    })
}

const getClientById = async (req, res) => {
    const { id } = req.params;

    const result = await Client.findById(id);

    return res.status(200).json({
        result
    })
}

const update = async (req, res) => {
    const { id } = req.params;

    const result = await Client.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
        message: 'Successfully updated',
        result: {
            name: result.name,
            nameForAdmin: result.nameForAdmin,
            phoneNumber: result.phoneNumber,
            description: result.description,
            discount: result.discount
        }
    })
}

const remove = async (req, res) => {
    const { id } = req.params;

    const result = await Client.findByIdAndDelete(id);

    return res.status(200).json({
        message: `Client deleted: ${result.name}`,
    })
}

export default {
    register: controllerWrapper(register),
    getAllClients: controllerWrapper(getAllClients),
    getClientById: controllerWrapper(getClientById),
    update: controllerWrapper(update),
    remove: controllerWrapper(remove)
}