import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import {  admin_home } from "../../constant/responseMessages/admin.response.message";
import admin_home_model from "../../models/admin/admin.home.model";


const admin_useCase_handler = {


    create_usecase: async (data: any): Promise<ApiResponse> => {
        const { description } = data;
        const res = admin_home_model.findOneAndUpdate({}, { description }, { upsert: true, new: true });
        if (!res) {
            return showResponse(false, admin_home.home_content_update_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_home.home_content_update_success, res, statusCodes.SUCCESS);
    },

  

}
export default admin_useCase_handler;