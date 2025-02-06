import express, { Request, Response } from "express";
import admin_internship_category_controller from "../../controllers/admin/admin.internship.category.controller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
import upload from "../../middlewares/multer";
const router = express.Router();


router.post('/create_internship_category', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { name } = req.body;
    const controller = new admin_internship_category_controller(req, res);
    const result: ApiResponse = await controller.create_internship_category({name});
    return showOutput(res, result, result.code);
});

router.get('/internship_category_listing', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { page, limit, search_key } = req.query;
    const controller = new admin_internship_category_controller(req, res);
    const result: ApiResponse = await controller.internship_category_listing(page, limit, search_key);
    return showOutput(res, result, result.code);
});

router.put('/update_internship_category', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { internship_category_id, name } = req.body;
    const controller = new admin_internship_category_controller(req, res);
    const result: ApiResponse = await controller.update_internship_category({internship_category_id, name});
    return showOutput(res, result, result.code);
});

router.delete('/delete_category', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { internship_category_id } = req.query;
    const controller = new admin_internship_category_controller(req, res);
    const result: ApiResponse = await controller.delete_category(internship_category_id);
    return showOutput(res, result, result.code);
});

router.put('/update_internship_details', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { internship_category_id, description } = req.body;
    const controller = new admin_internship_category_controller(req, res);
    const result: ApiResponse = await controller.update_internship_details({internship_category_id, description});
    return showOutput(res, result, result.code);
});

router.get('/get_internship_details', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { internship_category_id } = req.query;
    const controller = new admin_internship_category_controller(req, res);
    const result: ApiResponse = await controller.get_internship_details(internship_category_id);
    return showOutput(res, result, result.code);
});






export default router;