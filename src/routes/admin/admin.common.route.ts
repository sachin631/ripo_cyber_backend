import express, { Request, Response } from "express";
import admin_common_controller from "../../controllers/admin/admin.common.controller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
const router = express.Router();


router.put('/privacy_terms_about', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { privacy_policy, terms_condition, about_us } = req.body;
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.privacy_terms_about({ privacy_policy, terms_condition, about_us });
    return showOutput(res, result, result.code);
});

router.get('/privacy_terms_about_detail', async (req: Request | any, res: Response | any) => {
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.privacy_terms_about_detail();
    return showOutput(res, result, result.code);
});

router.post('/create_faq', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { question, answer } = req.body;
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.create_faq({ question, answer });
    return showOutput(res, result, result.code);
});

router.get('/faq_listing', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.faq_listing();
    return showOutput(res, result, result.code);
});

router.put('/update_faq', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { question_id, question, answer } = req.body;
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.update_faq({ question_id, question, answer });
    return showOutput(res, result, result.code);
});

router.delete('/delete_faq', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { question_id } = req.query;
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.delete_faq( question_id );
    return showOutput(res, result, result.code);
});

router.put('/edit_work_together', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { name, email, phone, fb_link, insta_link, twitter_link } = req.body;
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.edit_work_together({ name, email, phone, fb_link, insta_link, twitter_link });
    return showOutput(res, result, result.code);
});

router.get('/work_together_detail', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.work_together_detail();
    return showOutput(res, result, result.code);
});

router.get('/internship_applied_listing', verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const controller = new admin_common_controller(req, res);
    const result: ApiResponse = await controller.internship_applied_listing();
    return showOutput(res, result, result.code);
})

//home //discription //admin done
//your carer //dis  // admin done
//testiminial,usecase // name ,image,dis
//contact us //name, email, phone, message
//internship_category //name
//internshi details //cat_id,description
//work together //name, email, phone //fb,insta,twitter link //admin side //user side listing


//internship_form // intenship_id, name, email, phone //user side //admin side listing



export default router;