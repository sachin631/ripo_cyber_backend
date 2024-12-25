import joi from "joi";

export const validate_create_you_career=(common:any)=>{
    return joi.object({
        description:joi.string().required(),
    }).validate(common)
}