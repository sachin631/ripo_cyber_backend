import { Body, Controller, Get, Put, Route, Security, Tags } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_home_handler from "../../handlers/admin/admin.home.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_create_home } from "../../validator/admin/admin.home.validator";

@Tags('admin home routes')
@Route('/admin/home')
export default class admin_home_controller extends Controller {
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
    public async create_home(@Body() request: { description: string }): Promise<ApiResponse> {
        const validate =  validate_create_home(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_home_handler.create_home(request);
        return res;
    }

    @Security('Bearer')
    @Get('/home_detail')
    public async home_detail(): Promise<ApiResponse> {
        const res = admin_home_handler.home_detail();
        return res;
    }

}