import Joi from "joi";

const validate_register_schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required()
})
export const validate_register = (user: any) => {
    return validate_register_schema.validate(user);
}

export const validate_login=(user:any)=>{
    return Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    }).validate(user);
}

export const validate_forgotPassword=(user:any)=>{
    return Joi.object({
        email: Joi.string().required()
    }).validate(user);
}

export const validate_resendOtp=(user:any)=>{
    return Joi.object({
        email: Joi.string().required()
    }).validate(user);
}

export const validate_verifyOtp=(user:any)=>{
    return Joi.object({
        email: Joi.string().required(),
        otp: Joi.string().required()
    }).validate(user);
}

export const validate_update_profile=(user:any)=>{
    return Joi.object({
        name: Joi.string().required(),
        phone_number: Joi.string().required()
    }).validate(user);
}

export const validate_change_password=(user:any)=>{
    return Joi.object({
        old_password: Joi.string().required(),
        new_password: Joi.string().required()
    }).validate(user);
}

export const validate_new_password=(user:any)=>{
    return Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    }).validate(user);
}