import express, { Request, Response } from "express";
import admin_home_controller from "../../controllers/admin/admin.home.controller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
const router = express.Router();


router.put('/create_home', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { description } = req.body;
    const controller = new admin_home_controller(req, res);
    const result: ApiResponse = await controller.create_home({ description});
    return showOutput(res, result, result.code);
});

router.get('/home_detail', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const controller = new admin_home_controller(req, res);
    const result: ApiResponse = await controller.home_detail();
    return showOutput(res, result, result.code);
});







export default router;