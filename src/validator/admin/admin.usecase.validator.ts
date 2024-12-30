import Joi from "joi";

export const validate_create_usecase = (admin:any) => {
    return Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image:Joi.string().required()
    }).validate(admin)
}

export const validate_update_usecase = (admin:any) => {
    return Joi.object({
        usecase_id:Joi.string().required().max(24).min(24),
        name: Joi.string().optional().allow(''),
        description: Joi.string().optional().allow(''),
        image:Joi.string().optional().allow('')
    }).validate(admin)
}

export const validate_delete_usecase = (admin:any) => {
    return Joi.object({
        usecase_id:Joi.string().required().max(24).min(24)
    }).validate(admin)
}




