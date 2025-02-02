import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import express,{ Request, Response } from "express";
import user_common_controller from "../../controllers/user/user.common.controller";
const router = express.Router();

router.post('/contact_us', async (req: Request | any, res: Response | any) => {
    const { name,email,phone_number,message } = req.body;
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.contact_us({ name,email,phone_number,message });
    return showOutput(res, result, result.code);
});

router.get('/usecase_listing', async (req: Request | any, res: Response | any) => {
    const {data_type } = req.query;
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.usecase_listing(data_type);
    return showOutput(res, result, result.code);
});


export default router;