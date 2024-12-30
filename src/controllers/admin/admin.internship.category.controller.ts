import { Body, Controller, Delete, FormField, Get, Put, Query, Route, Security, Tags, UploadedFile } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_internship_category_handler from "../../handlers/admin/admin.internship.category.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_create_home } from "../../validator/admin/admin.home.validator";
import multer from "multer";
import { validate_create_usecase, validate_delete_usecase, validate_update_usecase } from "../../validator/admin/admin.usecase.validator";
import { validate_create_internship_category, validate_delete_category, validate_update_internship_category } from "../../validator/admin/admin.internship.category.validator";

@Tags('admin internship category routes')
@Route('/admin/internship/category')
export default class admin_internship_category_controller extends Controller {
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
    @Put('/create_internship_category')
    public async create_internship_category(@Body() request: { name: string }): Promise<ApiResponse> {
        const validate = await validate_create_internship_category(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_internship_category_handler.create_internship_category(request);
        return res;
    }

    @Security('Bearer')
    @Get('/internship_category_listing')
    public async internship_category_listing(@Query() page?: number,@Query() limit?: number,@Query() search_key?: string): Promise<ApiResponse> {
        const res = admin_internship_category_handler.internship_category_listing(page, limit, search_key);
        return res;
    }

    @Security('Bearer')
    @Put('/update_internship_category')
    public async update_internship_category(@Body() request:{internship_category_id:string,name:string}): Promise<ApiResponse> {
        const validate = await validate_update_internship_category(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_internship_category_handler.update_internship_category(request);
        return res;
    }

    @Security('Bearer')
    @Delete('/delete_category')
    public async delete_category(@FormField() internship_category_id:string): Promise<ApiResponse> {
        const validate = await validate_delete_category({internship_category_id});
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_internship_category_handler.delete_category(internship_category_id);
        return res;
    }


}