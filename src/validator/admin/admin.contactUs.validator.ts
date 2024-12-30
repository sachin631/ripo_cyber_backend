import Joi from "joi";

export const validate_delete_contact_us=(user:any)=>{
    return Joi.object({
        contact_us_id:Joi.string().required().max(24).min(24)
    }).validate(user);
}

export const validate_contact_us_details=(user:any)=>{
    return Joi.object({
        contact_us_id:Joi.string().required().max(24).min(24)
    }).validate(user);
}