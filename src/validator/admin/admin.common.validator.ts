import Joi from "joi";

export const validate_privacy_terms_about=(common:any)=>{
    return Joi.object({
        privacy_policy:Joi.string().optional().allow(''),
        terms_condition:Joi.string().optional().allow(''),
        about_us:Joi.string().optional().allow('')
    }).validate(common)
}

export const validate_update_faq=(common:any)=>{
    return Joi.object({
        question_id:Joi.string().required(),
        question:Joi.string().required(),
        answer:Joi.string().required()
    }).validate(common)
}

export const validate_delete_faq=(common:any)=>{
    return Joi.object({
        question_id:Joi.string().max(24).min(24).required(),        
    }).validate(common)
}