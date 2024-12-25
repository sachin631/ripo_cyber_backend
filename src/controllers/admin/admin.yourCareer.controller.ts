import { Body, Controller, Get, Put, Route, Security, Tags } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import admin_your_career_handler from "../../handlers/admin/admin.youCareer.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_create_home } from "../../validator/admin/admin.home.validator";
import { validate_create_you_career } from "../../validator/admin/admin.youCareer.validator";

@Tags('admin youCareer routes')
@Route('/admin/youCareer')
export default class admin_your_career_controller extends Controller {
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
    @Put('/create_career')
    public async create_career(@Body() request: { description: string }): Promise<ApiResponse> {
        const validate = await validate_create_you_career(request);
        if (validate.error) {
            return showResponse(false, validate.error.message, null, statusCodes.VALIDATION_ERROR);
        }
        const res = admin_your_career_handler.create_career(request);
        return res;
    }

    @Security('Bearer')
    @Get('/career_detail')
    public async career_detail(): Promise<ApiResponse> {
        const res = admin_your_career_handler.career_detail();
        return res;
    }

}