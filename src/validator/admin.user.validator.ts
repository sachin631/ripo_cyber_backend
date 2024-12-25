import Joi from "joi"
export const validate_user_detail=(user:any)=>{
    return Joi.object({
        user_id:Joi.string().required().max(24).min(24)
    }).validate(user);
}