import { Body, Controller, Get, Put, Route, Security, Tags } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_useCase_handler from "../../handlers/admin/admin.useCase.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_create_home } from "../../validator/admin/admin.home.validator";

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
    @Put('/create_home')
    public async create_usecase(@Body() request: { description: string }): Promise<ApiResponse> {
        const validate = await validate_create_home(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_useCase_handler.create_usecase(request);
        return res;
    }


}