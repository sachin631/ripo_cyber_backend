import express, { Request, Response } from "express";
import admin_useCase_controller from "../../controllers/admin/admin.useCase.contrroller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
const router = express.Router();


router.put('/create_usecase', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const {name,description,image } = req.body;
    const controller = new admin_useCase_controller(req, res);
    const result: ApiResponse = await controller.create_usecase({ name,description,image });
    return showOutput(res, result, result.code);
});









export default router;