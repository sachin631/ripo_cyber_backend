import Joi from "joi";

export const validate_admin_login=(user:any)=>{
    return Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    }).validate(user);
}

export const validate_admin_forgotPassword=(user:any)=>{
    return Joi.object({
        email: Joi.string().required()
    }).validate(user);
}

export const validate_admin_resendOtp=(user:any)=>{
    return Joi.object({
        email: Joi.string().required()
    }).validate(user);
}

export const validate_admin_verifyOtp=(user:any)=>{
    return Joi.object({
        email: Joi.string().required(),
        otp: Joi.string().required()
    }).validate(user);
}

export const validate_admin_update_profile=(user:any)=>{
    return Joi.object({
        name: Joi.string().required(),
        phone_number: Joi.string().required()
    }).validate(user);
}

export const validate_admin_change_password=(user:any)=>{
    return Joi.object({
        old_password: Joi.string().required(),
        new_password: Joi.string().required()
    }).validate(user);
}

export const validate_admin_update_profile_pic=(user:any)=>{
    return Joi.object({
        name: Joi.string().required(),
        phone_number: Joi.string().required()
    }).validate(user);
}

