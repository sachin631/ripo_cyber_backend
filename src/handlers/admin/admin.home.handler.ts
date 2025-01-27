import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import { admin_common, admin_home } from "../../constant/responseMessages/admin.response.message";
import admin_home_model from "../../models/admin/admin.home.model";


const admin_home_handler = {


    create_home: async (data: any): Promise<ApiResponse> => {
        try {
            const { description } = data;
            const res =await admin_home_model.findOneAndUpdate({}, { description }, { upsert: true, new: true });
            if (!res) {
                return showResponse(false, admin_home.home_content_update_failed, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_home.home_content_update_success, res, statusCodes.SUCCESS);
        } catch (error) {
            return showResponse(false, 'something went wrong', null, statusCodes.API_ERROR);
        }

    },

    home_detail: async (): Promise<ApiResponse> => {
        try {
            const res = await admin_home_model.findOne();
            if (!res) {
                return showResponse(false, admin_home.home_content_fetched_err, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_home.home_content_fetched_success, res, statusCodes.SUCCESS);
        } catch (error) {
            return showResponse(false, 'something went wrong', null, statusCodes.API_ERROR);
        }

    },

}
export default admin_home_handler;