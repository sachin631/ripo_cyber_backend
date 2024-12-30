import { Body, Controller, Delete, FormField, Get, Put, Query, Route, Security, Tags, UploadedFile } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_contactUs_handler from "../../handlers/admin/admin.contactUs.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_create_home } from "../../validator/admin/admin.home.validator";
import multer from "multer";
import { validate_create_usecase, validate_delete_usecase, validate_update_usecase } from "../../validator/admin/admin.usecase.validator";
import { validate_contact_us_details, validate_delete_contact_us } from "../../validator/admin/admin.contactUs.validator";

@Tags('admin contactUs routes')
@Route('/admin/contactUs')
export default class admin_contactUs_controller extends Controller {
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
    @Get('/contactUs_listing')
    public async contactUs_listing(@Query() page?: number,@Query() limit?: number,@Query() search_key?: string): Promise<ApiResponse> {
        const res = admin_contactUs_handler.contactUs_listing(page, limit, search_key);
        return res;
    }

    @Security('Bearer')
    @Get('/contactUs_detail')
    public async contactUs_detail(@Query() contact_us_id:string): Promise<ApiResponse> {
        const validate = await validate_contact_us_details({contact_us_id});
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_contactUs_handler.contactUs_detail(contact_us_id);
        return res;
    }

   

    @Security('Bearer')
    @Delete('/delete_contactUs')
    public async delete_contactUs(@FormField() contact_us_id:string): Promise<ApiResponse> {
        const validate = await validate_delete_contact_us({contact_us_id});
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_contactUs_handler.delete_contactUs(contact_us_id);
        return res;
    }


}