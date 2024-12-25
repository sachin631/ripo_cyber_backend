import { get } from "mongoose";
import { USER_STATUS } from "../../constant/app.constant";
import { userAuth } from "../../constant/responseMessages/user.response.message";
import statusCodes from "../../constant/statusCodes";
import { comparePassword, generateAccessToken, generateRefreshToken, hashPassword } from "../../helper/common.helper";
import cloudinaryUploaderr from "../../middlewares/cloudnary";
import { nodemailer_email } from "../../middlewares/nodeMailer";
import user_model from "../../models/user/user.auth.models";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";


const user_auth_handler = {

    register: async (data: any, profile_pic: any): Promise<ApiResponse> => {
        //user can not register with same email and phn multiple time
        //hashed password
        //upload image to cloudnary
        const { name, email, password, phone_number } = data;
        const user_exist = await user_model.findOne({ email: email, phone_number: phone_number, status: USER_STATUS.ACTIVE });
        if (user_exist) {
            return showResponse(false, userAuth.user_exist, null, 400);
        }
        const hashed = await hashPassword(password);

        //upload image to cloudnary
        const file_path = profile_pic?.path;
        const upload_image_to_cloudnary: any = await cloudinaryUploaderr(file_path);
        const public_id = upload_image_to_cloudnary?.public_id;
        const cloudinary_url = upload_image_to_cloudnary?.url;

        const obj: any = {
            name,
            email,
            password: hashed,
            phone_number,
            profile_pic: {
                public_id: public_id,
                url: cloudinary_url
            }
        }

        const user = await user_model.create(obj);
        if (!user) {
            return showResponse(false, userAuth.register_success, null, 400);
        }
        return showResponse(true, userAuth.register_success, user, 200);

    },

    login: async (data: any): Promise<ApiResponse> => {
        //check user exist or not
        //user active or not
        //check password is correct or not
        //generate token 
        //generate refresh token
        //send response
        const { email, password } = data;
        const is_user_exist = await user_model.findOne({ email: email, status: USER_STATUS.ACTIVE });
        if (!is_user_exist) {
            return showResponse(false, userAuth.user_not_exist, null, statusCodes.API_ERROR);
        }
        const is_password_correct = await comparePassword(password, is_user_exist.password);
        if (!is_password_correct) {
            return showResponse(false, userAuth.password_incorrect, null, statusCodes.API_ERROR);
        }
        const token = await generateAccessToken(is_user_exist?._id);
        const refresh_token = await generateRefreshToken(is_user_exist?._id);
        return showResponse(true, userAuth.login_success, { token, refresh_token, is_user_exist }, statusCodes.SUCCESS);

    },

    logout: async (): Promise<ApiResponse> => {
        return showResponse(true, userAuth.logout_success, null, statusCodes.SUCCESS);
    },

    forgotPassword: async (data: any): Promise<ApiResponse> => {
        //check user exist ot not
        //if not exist throw error 
        //else send email to user with otp of 4 digit string otp
        const { email } = data;
        const is_user_exist = await user_model.findOne({ email: email, status: USER_STATUS.ACTIVE });
        if (!is_user_exist) {
            return showResponse(false, userAuth.user_not_exist, null, statusCodes.API_ERROR);
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        const email_data = {
            to: email,
            subject: "Forgot Password",
            text: `Your OTP is ${otp}`
        }
        await nodemailer_email(email_data.to, email_data.subject, email_data.text);

        is_user_exist.otp = otp;
        await is_user_exist.save();

        return showResponse(true, userAuth.otp_send_success, null, statusCodes.SUCCESS);
    },

    resendOtp: async (data: any): Promise<ApiResponse> => {
        //check user exist or not if not throw error 
        //else send otp to user email
        const { email } = data;
        const is_user_exist = await user_model.findOne({ email: email, status: USER_STATUS.ACTIVE });
        if (!is_user_exist) {
            return showResponse(false, userAuth.user_not_exist, null, statusCodes.API_ERROR);
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const email_data = {
            to: email,
            subject: "Resend OTP",
            text: `Your OTP is ${otp}`
        }
        await nodemailer_email(email_data.to, email_data.subject, email_data.text);
        is_user_exist.otp = otp;
        await is_user_exist.save();
        return showResponse(true, userAuth.otp_send_success, null, statusCodes.SUCCESS);
    },

    verifyOtp: async (data: any): Promise<ApiResponse> => {
        const { email, otp } = data;
        const user = await user_model.findOne({ email, otp, status: USER_STATUS.ACTIVE });
        if (!user) {
            return showResponse(false, userAuth.invalid_otp, null, statusCodes.API_ERROR);
        }
        const new_user = await user_model.findOneAndUpdate({ email: email }, { isVerfied: true, otp: '' }, { new: true });
        if (!new_user) {
            return showResponse(false, userAuth.invalid_otp, null, statusCodes.API_ERROR);
        }
        return showResponse(true, userAuth.profile_update_failed, null, statusCodes.SUCCESS);
    },

    getProfile: async (user_id: any): Promise<ApiResponse> => {
        console.log(user_id, 'user_id');
        const user = await user_model.findById(user_id).select('-password -otp -isVerfied -status');
        if (!user) {
            return showResponse(false, userAuth.user_not_found, null, statusCodes.API_ERROR);
        }
        return showResponse(true, userAuth.user_found_success, user, statusCodes.SUCCESS);
    },

    updateProfile: async (data: any, profile_pic: any, user_id: any): Promise<ApiResponse> => {
        console.log(user_id, 'user_id');
        const { name, phone_number } = data;
        const user = await user_model.findOne({ _id: user_id, status: USER_STATUS.ACTIVE });
        if (!user) {
            return showResponse(false, userAuth.user_not_found, null, statusCodes.API_ERROR);
        }
        const file_path = profile_pic?.path;
        const upload_image_to_cloudnary: any = await cloudinaryUploaderr(file_path);
        const public_id = upload_image_to_cloudnary?.public_id;
        const cloudinary_url = upload_image_to_cloudnary?.url;

        const obj: any = {};
        if (profile_pic) {
            obj.profile_pic = {
                public_id: public_id,
                url: cloudinary_url
            }
        }
        if (name) {
            obj.name = name;
        }
        if (phone_number) {
            obj.phone_number = phone_number;
        }
        const updated_user = await user_model.findByIdAndUpdate(user_id, obj, { new: true });
        if (!updated_user) {
            return showResponse(false, userAuth.profile_update_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, userAuth.profile_update_success, null, statusCodes.SUCCESS);
    },

    changePassword: async (data: any, user_id: any): Promise<ApiResponse> => {
        const { old_password, new_password } = data;
        const user = await user_model.findOne({ _id: user_id, status: USER_STATUS.ACTIVE });
        if (!user) {
            return showResponse(false, userAuth.user_not_found, null, statusCodes.API_ERROR);
        }
        const is_password_correct = await comparePassword(old_password, user.password);
        if (!is_password_correct) {
            return showResponse(false, userAuth.password_incorrect, null, statusCodes.API_ERROR);
        }
        const hashed = await hashPassword(new_password);
        const updated_user = await user_model.findByIdAndUpdate(user_id, { password: hashed }, { new: true });
        if (!updated_user) {
            return showResponse(false, userAuth.profile_update_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, userAuth.password_update_success, null, statusCodes.SUCCESS);
    },

}

export default user_auth_handler;