import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import { admin_common, admin_home, youCareer } from "../../constant/responseMessages/admin.response.message";
import admin_home_model from "../../models/admin/admin.home.model";
import admin_your_carrer_model from "../../models/admin/admin.youCarrer.model";


const admin_your_career_handler = {


    create_career: async (data: any): Promise<ApiResponse> => {
        const { description } = data;
        const res =await admin_your_carrer_model.findOneAndUpdate({}, { description }, { upsert: true, new: true });
        if (!res) {
            return showResponse(false, youCareer.you_career_update_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, youCareer.you_career_update_success, res, statusCodes.SUCCESS);
    },

    career_detail: async (): Promise<ApiResponse> => {
        const res = await admin_your_carrer_model.findOne({});
        if (!res) {
            return showResponse(false, youCareer.you_career_fetched_err, null, statusCodes.API_ERROR);
        }
        return showResponse(true, youCareer.you_career_fetched_success, res, statusCodes.SUCCESS);
    },

}
export default admin_your_career_handler