import { ADMIN_STATUS } from "../constants.js";
import controllerWrapper from "../decorators/controllerWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { Procedure } from "../service/models/procedure.js";

const add = async (req, res) => {
    const { id: adminId } = req.user;

    const data = {
        ...req.body,
        admin: adminId
    }

    await Procedure.create(data);

    return res.status(201).json({
        message: `Procedure added`
    })
}

const getAllProcedures = async (req, res) => {
    const { _id: admin, status } = req.user;
    let result;

    if (status === ADMIN_STATUS.PRO) {
        result = await Procedure.find().populate([
            { path: 'admin', select: '_id name' },
            { path: 'client' },
            { path: 'description', select: '-description' }
        ]);;
    } else {
        result = await Procedure.find({ admin }).populate([
            { path: 'client' },
            { path: 'description', select: '-description' }
        ]);;
    }

    if (!result) {
        throw HttpError(404);
    }

    return res.status(200).json({
        count: result.length,
        data: result
    })
}

const getProcedureById = async (req, res) => {
    const { _id: admin, status } = req.user;
    const { id } = req.params;

    const findParams = status === ADMIN_STATUS.PRO ? { _id: id } : { _id: id, admin };

    const result = await Procedure.find(findParams).populate([
        { path: 'admin', select: '_id name' },
        { path: 'client' },
        { path: 'description', select: '-description' }
    ]);

    if (!result || !result.length) {
        throw HttpError(404);
    }

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const { id } = req.params;

    const result = await Procedure.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
        message: 'Successfully updated',
        result
    })
}

const remove = async (req, res) => {
    const { id } = req.params;

    await Procedure.findByIdAndDelete(id);

    return res.status(200).json({
        message: `Procedure deleted`,
    })
}

export default {
    add: controllerWrapper(add),
    getAllProcedures: controllerWrapper(getAllProcedures),
    getProcedureById: controllerWrapper(getProcedureById),
    update: controllerWrapper(update),
    remove: controllerWrapper(remove)
}