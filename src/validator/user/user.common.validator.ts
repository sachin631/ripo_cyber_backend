import Joi from "joi";

export const validate_contact_us=(common:any)=>{
    return Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.string().required(),
        message: Joi.string().required()
    }).validate(common);
}