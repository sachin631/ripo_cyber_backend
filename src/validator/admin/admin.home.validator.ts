import Joi from "joi";

export const validate_create_home=(common:any)=>{
    return Joi.object({
        description:Joi.string().required()
    }).validate(common)
}