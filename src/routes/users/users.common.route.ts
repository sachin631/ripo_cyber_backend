import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import express, { Request, Response } from "express";
import user_common_controller from "../../controllers/user/user.common.controller";
import { verifyUserToken } from "../../middlewares/login_middlewares";
const router = express.Router();

router.post('/contact_us', async (req: Request | any, res: Response | any) => {
    const { name, email, phone_number, message } = req.body;
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.contact_us({ name, email, phone_number, message });
    return showOutput(res, result, result.code);
});

router.get('/usecase_listing', async (req: Request | any, res: Response | any) => {
    const { data_type } = req.query;
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.usecase_listing(data_type);
    return showOutput(res, result, result.code);
});

router.get('/privacy_terms_about_detail', async (req: Request | any, res: Response | any) => {
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.privacy_terms_about_detail();
    return showOutput(res, result, result.code);
});

router.get('/faq_listing', async (req: Request | any, res: Response | any) => {
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.faq_listing();
    return showOutput(res, result, result.code);
});

router.get('/work_together_detail', async (req: Request | any, res: Response | any) => {
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.work_together_detail();
    return showOutput(res, result, result.code);
})

//internship
router.get('/internship_category_listing', async (req: Request | any, res: Response | any) => {

    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.internship_category_listing();
    return showOutput(res, result, result.code);
});

router.get('/get_internship_details', async (req: Request | any, res: Response | any) => {
    const { internship_category_id } = req.query;
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.get_internship_details(internship_category_id);
    return showOutput(res, result, result.code);
})

router.get('/detail', async (req: Request | any, res: Response | any) => {
    const { user_id } = req.query;
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.detail(user_id);
    return showOutput(res, result, result.code);
});

router.get('/career_detail', async (req: Request | any, res: Response | any) => {
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.career_detail();
    return showOutput(res, result, result.code);
});

router.post('/apply_internship', verifyUserToken, async (req: Request | any, res: Response | any) => {
    const { internship_id, name, email, phone } = req.body;
    const controller = new user_common_controller(req, res);
    const result: ApiResponse = await controller.apply_internship({ internship_id, name, email, phone });
    return showOutput(res, result, result.code);
});






export default router;