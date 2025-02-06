import { Body, Controller, Delete, Get, Post, Put, Query, Route, Security, Tags } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_common_handler from "../../handlers/admin/admin.common.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_delete_faq, validate_privacy_terms_about, validate_update_faq, validate_work_together } from "../../validator/admin/admin.common.validator";

@Tags('admin common routes')
@Route('/admin/common')
export default class admin_common_controller extends Controller {
    req: Request;
    res: Response;
    userId: String;
    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.userId ? req.body.userId : ''
    }
   
    @Security('Bearer')
    @Put('/privacy_terms_about')
    public async privacy_terms_about(@Body() request: { privacy_policy?: string, terms_condition?: string ,about_us?:string}): Promise<ApiResponse> {
        const validate = validate_privacy_terms_about(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_common_handler.privacy_terms_about(request);
        return res;
    }

    @Get('/privacy_terms_about_detail')
    public async privacy_terms_about_detail(): Promise<ApiResponse> {
        const res = admin_common_handler.privacy_terms_about_detail();
        return res;
    }

    @Security('Bearer')
    @Post('/create_faq')
    public async create_faq(@Body() request:{question:string,answer:string}): Promise<ApiResponse> {
        const res = admin_common_handler.create_faq(request);
        return res;
    }

    @Security('Bearer')
    @Get('/faq_listing')
    public async faq_listing(): Promise<ApiResponse> {
        const res = admin_common_handler.faq_listing();
        return res;
    }

    @Security('Bearer')
    @Put('/update_faq')
    public async update_faq(@Body() request:{question_id:string,question:string,answer:string}): Promise<ApiResponse> {
        const validate = validate_update_faq(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_common_handler.update_faq(request);
        return res;
    }

    @Security('Bearer')
    @Delete('/delete_faq')
    public async delete_faq(@Query() question_id:string): Promise<ApiResponse> {
        const validate = validate_delete_faq({question_id});
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_common_handler.delete_faq(question_id);
        return res;
    }

    @Security('Bearer')
    @Put('/edit_work_together')
    public async edit_work_together(@Body() request:{name:string,email:string,phone:string,fb_link:string,insta_link:string,twitter_link:string}): Promise<ApiResponse> {
        const validate=validate_work_together(request);
        const res = admin_common_handler.edit_work_together(request);
        return res;
    }

    @Security('Bearer')
    @Get('/work_together_detail')
    public async work_together_detail(): Promise<ApiResponse> {
        const res = admin_common_handler.work_together_detail();
        return res;
    }

    @Security('Bearer')
    @Get('/internship_applied_listing')
    public async internship_applied_listing(): Promise<ApiResponse> {
        const res = admin_common_handler.internship_applied_listing();
        return res;
    }


//
   




}