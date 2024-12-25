import { Body, Controller, Delete, FormField, Get, Post, Put, Query, Route, Security, Tags, UploadedFile } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_user_handler from "../../handlers/admin/admin.user.handler";
import { showResponse } from "../../utils/response.utils";
import { validate_change_password, validate_forgotPassword, validate_login, validate_register, validate_resendOtp, validate_update_profile, validate_verifyOtp } from "../../validator/user.auth.validator";
import statusCodes from "../../constant/statusCodes";
import { validate_user_detail } from "../../validator/admin.user.validator";

@Tags('admin user routes')
@Route('/admin/user')
export default class admin_user_controller extends Controller {
    req: Request;
    res: Response;
    userId: String;
    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.userId ? req.body.userId : ''
    }
   

    @Get('/listing')
    public async listing(): Promise<ApiResponse> {
        const res = admin_user_handler.listing();
        return res;
    }

    @Get('/detail')
    public async detail(@Query() user_id:string): Promise<ApiResponse> {
        const validate=validate_user_detail({user_id});
        if(validate.error){
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);   
        }
        const res = admin_user_handler.detail(user_id);
        return res;
    }

    @Delete('/delete')
    public async delete(@Query() user_id:string): Promise<ApiResponse> {
        const validate=validate_user_detail({user_id});
        if(validate.error){
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);   
        }
        const res = admin_user_handler.delete(user_id);
        return res;
    }


   




}