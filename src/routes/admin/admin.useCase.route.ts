import express, { Request, Response } from "express";
import admin_useCase_controller from "../../controllers/admin/admin.useCase.contrroller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
import upload from "../../middlewares/multer";
const router = express.Router();


router.post('/create_usecase', upload.single('image'), verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { name, description ,data_type} = req.body;
    const controller = new admin_useCase_controller(req, res);
    const result: ApiResponse = await controller.create_usecase(name, description,data_type, req.file);
    return showOutput(res, result, result.code);
});

router.get('/usecase_listing', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { page, limit, search_key,data_type } = req.query;
    const controller = new admin_useCase_controller(req, res);
    const result: ApiResponse = await controller.usecase_listing(page, limit, search_key,data_type);
    return showOutput(res, result, result.code);
});

router.put('/update_usecase', upload.single('image'), verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { usecase_id, name, description,data_type } = req.body;
    const controller = new admin_useCase_controller(req, res);
    const result: ApiResponse = await controller.update_usecase(usecase_id, name, description,data_type, req.file);
    return showOutput(res, result, result.code);
});

router.delete('/delete_usecase', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { usecase_id,data_type } = req.query;
    const controller = new admin_useCase_controller(req, res);
    const result: ApiResponse = await controller.delete_usecase(usecase_id,data_type);
    return showOutput(res, result, result.code);
});









export default router;