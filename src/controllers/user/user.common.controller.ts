import { Body, Controller, FormField, Get, Post, Put, Route, Security, Tags, UploadedFile } from "tsoa";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/interface.utils";
import user_common_handler from "../../handlers/user/user.common.handler";
import { showResponse } from "../../utils/response.utils";
import statusCodes from "../../constant/statusCodes";
import { validate_contact_us } from "../../validator/user/user.common.validator";

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


}