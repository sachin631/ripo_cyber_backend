import Joi from "joi"
export const validate_user_detail = (user: any) => {
    return Joi.object({
        user_id: Joi.string().required().max(24).min(24)
    }).validate(user);
}

export const validate_apply_internship = (user: any) => {
    return Joi.object({
        internship_id: Joi.string().required().max(24).min(24),
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
    }).validate(user);
}