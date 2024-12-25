import { Response } from 'express'
import { ApiResponse } from './interface.utils';



export const showResponse = (status: boolean, message: string, data: any = null, code: number | null = null) => {

    const response: ApiResponse = {
        status: status,
        message: message,
        code: 400
    };

    if (code !== null) {
        response.code = code;
    }
    if (data !== null) {
        response.data = data;
    }

    return response;
};

export const showOutput = (res: Response, showResponse: ApiResponse, code: number) => {
    // delete response.code;
    const res_msg: any = {
        message: showResponse.message,
        data: showResponse.data ?? {}
    }

    res.status(code).json(res_msg);
};