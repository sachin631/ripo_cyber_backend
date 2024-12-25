import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

export const hashPassword = async (password: any) => {
    const hasher_password = await bcryptjs.hash(password, 10);
    return hasher_password;
}

export const comparePassword=async(password:any,hashed_password:any)=>{
    const is_password_matched=await bcryptjs.compare(password,hashed_password);
    return is_password_matched;
}

export const generateAccessToken=async(user_id:any)=>{
    const token =await jsonwebtoken.sign({_id:user_id},'accesstokensecretkey',{expiresIn:process.env.ACCESS_TOKEN_EXPIRE});
    return token;
}

export const generateRefreshToken=async(user_id:any)=>{
    const token =await jsonwebtoken.sign({_id:user_id},'refreshtokensecretkey',{expiresIn:process.env.REFRESH_TOKEN_EXPIRE});
    return token;
}