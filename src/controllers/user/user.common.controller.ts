import { Body, Controller, FormField, Get, Post, Put, Query, Route, Security, Tags, UploadedFile } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import user_common_handler from "../../handlers/user/user.common.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_contact_us } from "../../validator/user/user.common.validator";
import { validate_get_internship_details } from "../../validator/admin/admin.internship.category.validator";
import { validate_apply_internship, validate_user_detail } from "../../validator/admin/admin.user.validator";

@Tags('user common routes')
@Route('/user/common')
export default class user_common_controller extends Controller {
    req: Request;
    res: Response;
    userId: String;
    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.userId ? req.body.userId : ''
    }

    @Post("/contact_us")
    public async contact_us(@Body() request: { name: string, email: string, phone_number: string, message: string }): Promise<ApiResponse> {
        const validate = validate_contact_us(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR)
        }
        const res = user_common_handler.contact_us(request);
        return res;
    }

    @Get('/usecase_listing')
    public async usecase_listing(@Query() data_type?: number): Promise<ApiResponse> {
        const res = user_common_handler.usecase_listing(data_type);
        return res;
    }

    @Get('/privacy_terms_about_detail')
    public async privacy_terms_about_detail(): Promise<ApiResponse> {
        const res = user_common_handler.privacy_terms_about_detail();
        return res;
    }

    @Get('/faq_listing')
    public async faq_listing(): Promise<ApiResponse> {
        const res = user_common_handler.faq_listing();
        return res;
    }


    @Get('/work_together_detail')
    public async work_together_detail(): Promise<ApiResponse> {
        const res = user_common_handler.work_together_detail();
        return res;
    }

    @Get('/internship_category_listing')
    public async internship_category_listing(): Promise<ApiResponse> {
        const res = user_common_handler.internship_category_listing();
        return res;
    }

    @Get('/get_internship_details')
    public async get_internship_details(@Query() internship_category_id: string): Promise<ApiResponse> {
        const validate = validate_get_internship_details({ internship_category_id });
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = user_common_handler.get_internship_details(internship_category_id);
        return res;
    }

    @Get('/detail')
    public async detail(@Query() user_id:string): Promise<ApiResponse> {
        const validate=validate_user_detail({user_id});
        if(validate.error){
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);   
        }
        const res = user_common_handler.detail(user_id);
        return res;
    }

    @Security('Bearer')
    @Get('/career_detail')
    public async career_detail(): Promise<ApiResponse> {
        const res = user_common_handler.career_detail();
        return res;
    }

    @Security('Bearer')
    @Post('/apply_internship')
    public async apply_internship(@Body() request: { internship_id: string, name: string, email: string, phone: string }): Promise<ApiResponse> {
       const validate=validate_apply_internship(request);
        if(validate.error){
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);   
        }
        const res = user_common_handler.apply_internship(request,this.userId);
        return res;
    }

    


}