import express, { Request, Response } from "express";
import admin_contactUs_controller from "../../controllers/admin/admin.contactUs.controller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
const router = express.Router();




router.get('/contactUs_listing', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { page, limit, search_key } = req.query;
    const controller = new admin_contactUs_controller(req, res);
    const result: ApiResponse = await controller.contactUs_listing(page, limit, search_key);
    return showOutput(res, result, result.code);
});

router.get('/contactUs_detail', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { contact_us_id } = req.query;
    const controller = new admin_contactUs_controller(req, res);
    const result: ApiResponse = await controller.contactUs_detail(contact_us_id);
    return showOutput(res, result, result.code);
})


router.delete('/delete_contactUs', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { contact_us_id } = req.query;
    const controller = new admin_contactUs_controller(req, res);
    const result: ApiResponse = await controller.delete_contactUs(contact_us_id);
    return showOutput(res, result, result.code);
});









export default router;