import Joi from "joi";
import { DATA_TYPE } from "../../constant/app.constant";

export const validate_create_usecase = (admin: any) => {
    return Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        data_type: Joi.number().valid(DATA_TYPE.OUR_SERVICES, DATA_TYPE.WHY_US, DATA_TYPE.USE_CASE).required()
    }).validate(admin)
}

export const validate_update_usecase = (admin: any) => {
    return Joi.object({
        usecase_id: Joi.string().required().max(24).min(24),
        name: Joi.string().optional().allow(''),
        description: Joi.string().optional().allow(''),
        image: Joi.string().optional().allow(''),
        data_type: Joi.number().valid(DATA_TYPE.OUR_SERVICES, DATA_TYPE.WHY_US, DATA_TYPE.USE_CASE).required()
    }).validate(admin)
}

export const validate_delete_usecase = (admin: any) => {
    return Joi.object({
        usecase_id: Joi.string().required().max(24).min(24),
        data_type: Joi.number().valid(DATA_TYPE.OUR_SERVICES, DATA_TYPE.WHY_US, DATA_TYPE.USE_CASE).required()
    }).validate(admin)
}




