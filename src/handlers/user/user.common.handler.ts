import { user_common } from "../../constant/responseMessages/user.response.message";
import statusCodes from "../../constant/statusCodes";
import admin_contactUs_model from "../../models/admin/admin.contactUs.model";
import { ApiResponse } from "../../utils/interface.utils"
import { showResponse } from "../../utils/response.utils";

const user_common_handler = {
    contact_us: async (data: any): Promise<ApiResponse> => {
        const { name, email, phone_number, message } = data;
        const contact_us = await admin_contactUs_model.create({ name, email, phone_number, message });
        if (!contact_us) {
            return showResponse(false, user_common.contact_us_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, user_common.contact_us_success, null, statusCodes.SUCCESS);
    }


}

export default user_common_handler