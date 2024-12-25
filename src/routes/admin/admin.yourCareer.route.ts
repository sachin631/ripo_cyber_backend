import express, { Request, Response } from "express";
import admin_your_career_controller from "../../controllers/admin/admin.yourCareer.controller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
const router = express.Router();


router.put('/create_career', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { description } = req.body;
    const controller = new admin_your_career_controller(req, res);
    const result: ApiResponse = await controller.create_career({ description});
    return showOutput(res, result, result.code);
});

router.get('/career_detail', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const controller = new admin_your_career_controller(req, res);
    const result: ApiResponse = await controller.career_detail();
    return showOutput(res, result, result.code);
});







export default router;