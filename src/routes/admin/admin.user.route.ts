import express, { Request, Response } from "express";
import admin_user_controller from "../../controllers/admin/admin.user.controller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
const router = express.Router();


router.get('/listing', async (req: Request | any, res: Response | any) => {
    const {page,limit,search_key}=req.query
    const controller = new admin_user_controller(req, res);
    const result: ApiResponse = await controller.listing(page,limit,search_key);
    return showOutput(res, result, result.code);
});

router.get('/detail', async (req: Request | any, res: Response | any) => {
    const {user_id}=req.query;
    const controller = new admin_user_controller(req, res);
    const result: ApiResponse = await controller.detail(user_id);
    return showOutput(res, result, result.code);
});

router.delete('/delete', async (req: Request | any, res: Response | any) => {
    const {user_id}=req.query;
    const controller = new admin_user_controller(req, res);
    const result: ApiResponse = await controller.delete(user_id);
    return showOutput(res, result, result.code);
})





export default router;