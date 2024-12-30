import { Body, Controller, Delete, FormField, Get, Put, Query, Route, Security, Tags, UploadedFile } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_useCase_handler from "../../handlers/admin/admin.useCase.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_create_home } from "../../validator/admin/admin.home.validator";
import multer from "multer";
import { validate_create_usecase, validate_delete_usecase, validate_update_usecase } from "../../validator/admin/admin.usecase.validator";

@Tags('admin useCase routes')
@Route('/admin/useCase')
export default class admin_useCase_controller extends Controller {
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
    @Put('/create_usecase')
    public async create_usecase(@FormField() name:string,@FormField() description:string,@UploadedFile()image:Express.Multer.File): Promise<ApiResponse> {
        const request={name,description,image}
        const validate = await validate_create_usecase(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_useCase_handler.create_usecase(request,image);
        return res;
    }

    @Security('Bearer')
    @Get('/usecase_listing')
    public async usecase_listing(@Query() page?: number,@Query() limit?: number,@Query() search_key?: string): Promise<ApiResponse> {
        const res = admin_useCase_handler.usecase_listing(page, limit, search_key);
        return res;
    }

    @Security('Bearer')
    @Put('/update_usecase')
    public async update_usecase(@FormField() usecase_id:string,@FormField() name:string,@FormField() description:string,@UploadedFile()image:Express.Multer.File): Promise<ApiResponse> {
        const request={usecase_id,name,description,image}
        const validate = await validate_update_usecase(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_useCase_handler.update_usecase(request,image);
        return res;
    }

    @Security('Bearer')
    @Delete('/delete_usecase')
    public async delete_usecase(@FormField() usecase_id:string): Promise<ApiResponse> {
        const validate = await validate_delete_usecase({usecase_id});
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_useCase_handler.delete_usecase(usecase_id);
        return res;
    }


}