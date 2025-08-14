import controllerWrapper from "../decorators/controllerWrapper.js";
import Service from "../service/models/service.js";

const add = async (req, res) => {
    const result = await Service.create(req.body);

    return res.status(201).json({
        message: `Service added: ${result.serviceName}`
    })
}

const getAllServices = async (_, res) => {
    const result = await Service.find();

    return res.status(200).json({
        count: result.length,
        data: result
    })
}

const getServiceById = async (req, res) => {
    const { id } = req.params;

    const result = await Service.findById(id);

    return res.status(200).json({
        result
    })
}

const update = async (req, res) => {
    const { id } = req.params;

    const result = await Service.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
        message: 'Successfully updated',
        result
    })
}

const remove = async (req, res) => {
    const { id } = req.params;

    const result = await Service.findByIdAndDelete(id);

    return res.status(200).json({
        message: `Service deleted: ${result.serviceName}`,
    })
}

export default {
    add: controllerWrapper(add),
    getAllServices: controllerWrapper(getAllServices),
    getServiceById: controllerWrapper(getServiceById),
    update: controllerWrapper(update),
    remove: controllerWrapper(remove)
}