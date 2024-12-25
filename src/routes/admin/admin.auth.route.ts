import express, { Request, Response } from "express";
import admin_auth_controller from "../../controllers/admin/admin.auth.controller";
import { ApiResponse } from "../../utils/interface.utils";
import { showOutput } from "../../utils/response.utils";
import upload from "../../middlewares/multer";
import { verifyAdminToken } from "../../middlewares/login_middlewares";
const router = express.Router();


router.post('/login', async (req: Request | any, res: Response | any) => {
    const { email, password } = req.body;
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.login({ email, password });
    return showOutput(res, result, result.code);
});

router.post('/logout', async (req: Request | any, res: Response | any) => {
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.logout();
    return showOutput(res, result, result.code);
});

router.post('/forgot_password', async (req: Request | any, res: Response | any) => {
    const { email } = req.body;
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.forgotPassword({ email });
    return showOutput(res, result, result.code);
});

router.post('/resend_otp', async (req: Request | any, res: Response | any) => {
    const { email } = req.body;
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.resendOtp({ email });
    return showOutput(res, result, result.code);
});

router.post('/verify_otp', async (req: Request | any, res: Response | any) => {
    const { email, otp } = req.body;
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.verifyOtp({ email, otp });
    return showOutput(res, result, result.code);
});

// admin profile
router.get('/profile',verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.getProfile();
    return showOutput(res, result, result.code);
});

router.put('/update_profile', upload.single('profile_pic'),verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { name, phone_number } = req.body;
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.updateProfile(name, phone_number, req.file);
    return showOutput(res, result, result.code);
});

router.put('/change_password',verifyAdminToken, async (req: Request | any, res: Response | any) => {
    const { old_password, new_password } = req.body;
    const controller = new admin_auth_controller(req, res);
    const result: ApiResponse = await controller.changePassword({old_password, new_password});
    return showOutput(res, result, result.code);
});



export default router;