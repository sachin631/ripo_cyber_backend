import Joi from "joi";

export const validate_create_internship_category=(user:any)=>{
    return Joi.object({
        name:Joi.string().required()
    }).validate(user);
}

export const validate_update_internship_category=(user:any)=>{
    return Joi.object({
        internship_category_id:Joi.string().required().max(24).min(24),
        name:Joi.string().required()
    }).validate(user);
}

export const validate_delete_category=(user:any)=>{
    return Joi.object({
        internship_category_id:Joi.string().required().max(24).min(24)
    }).validate(user);
}

export const validate_update_internship_details=(user:any)=>{
    return Joi.object({
        internship_category_id:Joi.string().required().max(24).min(24),
        description:Joi.string().required()
    }).validate(user);
}

export const validate_get_internship_details=(user:any)=>{
    return Joi.object({
        internship_category_id:Joi.string().required().max(24).min(24)
    }).validate(user);
}