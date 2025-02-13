import { Body, Controller, FormField, Get, Post, Put, Route, Security, Tags, UploadedFile } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import user_auth_handler from "../../handlers/user/user.auth.handler";
import { showResponse } from "../../utils/response.utils";
import { validate_change_password, validate_forgotPassword, validate_login, validate_new_password, validate_register, validate_resendOtp, validate_update_profile, validate_verifyOtp } from "../../validator/user/user.auth.validator";
import statusCodes from "../../constant/statusCodes";

@Tags('user auth routes')
@Route('/user/auth')
export default class user_auth_controller extends Controller {
    req: Request;
    res: Response;
    userId: String;
    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.userId ? req.body.userId : ''
    }
    /**
   * Save a User
   */
    @Post("/register")
    public async register(@FormField() name: string, @FormField() email: string, @FormField() phone_number: string, @FormField() password: string, @UploadedFile() profile_pic: Express.Multer.File): Promise<ApiResponse> {
        const request = { name, email, phone_number, password }
        const validate = validate_register(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR)
        }
        const res = user_auth_handler.register(request, profile_pic);
        return res;
    }

    @Post('/login')
    public async login(@Body() request: { email: string, password: string }): Promise<ApiResponse> {
        const validate = validate_login(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = user_auth_handler.login(request);
        return res;
    }

    @Post('/logout')
    public async logout(): Promise<ApiResponse> {
        const res = user_auth_handler.logout();
        return res;
    }

    @Post('/forgot_password')
    public async forgotPassword(@Body() request: { email: string }): Promise<ApiResponse> {
        const validate = validate_forgotPassword(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = user_auth_handler.forgotPassword(request);
        return res;
    }

    @Post('/resend_otp')
    public async resendOtp(@Body() request: { email: string }): Promise<ApiResponse> {
        const validate = validate_resendOtp(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = user_auth_handler.resendOtp(request);
        return res;
    }

    @Post('/verify_otp')
    public async verifyOtp(@Body() request: { email: string, otp: string }): Promise<ApiResponse> {
        const validate = validate_verifyOtp(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = user_auth_handler.verifyOtp(request);
        return res;
    }

    @Security('Bearer')
    @Get('/profile')
    public async getProfile(): Promise<ApiResponse> {
        const res = user_auth_handler.getProfile(this.userId);
        return res;
    }

    @Security('Bearer')
    @Put('/update_profile')
    public async updateProfile(@FormField() name: string, @FormField() phone_number: string, @UploadedFile() profile_pic: Express.Multer.File): Promise<ApiResponse> {
        const request = { name, phone_number }
        const validate = validate_update_profile(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = user_auth_handler.updateProfile(request, profile_pic, this.userId);
        return res;
    }

    @Security('Bearer')
    @Put('/change_password')
    public async changePassword(@Body() request: { old_password: string, new_password: string }): Promise<ApiResponse> {
        const validate = validate_change_password(request);
        const res = user_auth_handler.changePassword(request, this.userId);
        return res;
    }

    @Put('/new_password')
    public async newPassword(@Body() request: { email: string, password: string }): Promise<ApiResponse> {
        const validate = validate_new_password(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = user_auth_handler.newPassword(request);
        return res;
    }




}